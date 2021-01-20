import React from 'react';
import Resources from "@morningtrain/resources";
import debounce from "lodash/debounce";

class AvatarFetcher {

    cache = new Map();
    callbacks = {};
    queue = [];
    executing = false;

    enqueue(user_id, callback) {
        this.callbacks[user_id] = callback;
        this.queue.push(user_id);
        this.executeQueue();
    }

    executeQueue = debounce(() => {

        if (this.executing === true) {
            return;
        }

        if (this.queue.length === 0) {
            return;
        }

        this.executing = true;

        let workableIds = [...this.queue];
        this.queue = [];

        let operation = this.operation;

        operation.constraints = {ids: workableIds};
        operation.execute()
            .then(data => {

                if(data.collection && data.collection.length > 0) {
                    data.collection.forEach((item) => {
                        this.cache.set(item.user.id, item.svg);

                        if(typeof(this.callbacks[item.user.id]) === 'function') {
                            this.callbacks[item.user.id]();
                        }

                    });
                }

                this.executing = false;
                this.executeQueue();

            })
            .catch(() => {
                this.executing = false;
                this.executeQueue();
            });

    }, 20, {leading: false})

    get operation() {
        return this.resource.operation('fetch');
    }

    get resource() {
        return Resources.make('api', 'user_avatar');
    }

    fetch(user_id) {
        return new Promise((resolve, reject) => {

            if (this.cache.has(user_id)) {
                resolve(this.cache.get(user_id));
            }

            this.enqueue(user_id, () => {
                if (this.cache.has(user_id)) {
                    resolve(this.cache.get(user_id));
                } else {
                    reject();
                }
            });

        });
    }

}

const AvatarFetcherInstance = new AvatarFetcher();
export default AvatarFetcherInstance;
