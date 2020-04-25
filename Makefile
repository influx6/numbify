token?=''
port?=3030

app_up:
	cd app && npm run start

up:
	env NUMVERIFY_TOKEN=${token} npm run dev

prepare:
	cd app && yarn install && yarn run build && cd -
	yarn install && yarn run build

start: prepare
	env NUMVERIFY_TOKEN=${token} PORT=${port} node ./src/index.js
