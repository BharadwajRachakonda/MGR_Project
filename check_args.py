from pathlib import Path
text = Path('args.txt').read_text()
print('spring-boot-4.0.3.jar' in text)
print('org.springframework.boot.SpringApplication' in text)
print(len(text))
