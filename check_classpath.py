from pathlib import Path
text = Path('args.txt').read_text()
for token in ['slf4j-nop', 'logback-classic', 'slf4j-api', 'logback-core']:
    print(token, token in text)
print('length', len(text))
