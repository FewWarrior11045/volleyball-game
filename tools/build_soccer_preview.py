# 피직스 축구 미리보기: soccer.html + soccer.js + 사진을 한 파일로 (Claude outputs/soccer-preview.html)
import base64, os, re
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
js = open(os.path.join(root, 'soccer.js'), encoding='utf-8').read()
names = re.findall(r"'([a-z_]+)'\]", js)
data = {}
for n in names:
    f = os.path.join(root, 'assets', n + '.png')
    if os.path.exists(f): data[n] = 'data:image/png;base64,' + base64.b64encode(open(f, 'rb').read()).decode()
js = js.replace("src: 'assets/' + f + '.png'", "src: (window.__IMG && __IMG[f]) || 'assets/' + f + '.png'")
html = open(os.path.join(root, 'soccer.html'), encoding='utf-8').read()
inject = '<script>window.__IMG=' + repr(data).replace("'", '"') + ';</script>\n<script>\n' + js + '\n</script>'
html = html.replace('<script src="soccer.js"></script>', inject)
os.makedirs(os.path.join(root, 'Claude outputs'), exist_ok=True)
out = os.path.join(root, 'Claude outputs', 'soccer-preview.html')
open(out, 'w', encoding='utf-8').write(html)
print(out, len(html) // 1024, 'KB', len(data), 'images')
