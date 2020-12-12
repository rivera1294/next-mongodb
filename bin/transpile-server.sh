#!/bin/sh

dist_dir='./server-dist'

for path in \
    run.js \
    express-tools \
    models \
    utils
    # socket-logic
do
    arg='--out-file'

    if [ -d "./${path}" ]; then
        arg='-d'
    fi

    ./node_modules/.bin/babel "./${path}" "${arg}" "${dist_dir}/${path}" || exit 1
done
