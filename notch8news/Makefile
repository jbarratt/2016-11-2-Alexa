.PHONY: test deploy

all: lambda.zip

test:
	npm test

lambda.zip: index.js package.json
	rm lambda.zip
	zip -r lambda.zip index.js package.json node_modules/

deploy: lambda.zip
	aws lambda update-function-code --function-name notchNews --zip-file fileb://lambda.zip
