import json

import redis
from django.conf import settings


class BaseCache:
    def __init__(self):
        # Init redis client instant
        self.redis = redis.Redis(host=settings.APP_REDIS_HOST, port=int(settings.APP_REDIS_PORT))


class CheckEmailExistCache(BaseCache):
    DONE_INDEX_KEY = 'task-{0}-done-idx'
    RESULT_KEY = 'task-{0}-result'
    TOTAL_TASK = 'task-{0}-total'
    
    def __init__(self, tracking_key):
        self.tracking_key = tracking_key
        super(CheckEmailExistCache, self).__init__()

    @property
    def total_task_key(self):
        return self.TOTAL_TASK.format(self.tracking_key)

    @property
    def done_idxs_key(self):
        return self.DONE_INDEX_KEY.format(self.tracking_key)

    @property
    def result_key(self):
        return self.RESULT_KEY.format(self.tracking_key)

    def set_total(self, total):
        return self.redis.set(self.total_task_key, total)

    def get_total(self):
        return self.redis.get(self.total_task_key).decode()

    def add_result(self, index, result):
        # Rpush is redis command which add member to the right of list
        self.redis.rpush(self.done_idxs_key, index)
        self.redis.rpush(self.result_key, *[json.dumps(res) for res in result])

    def get_result(self):
        return [res.decode() for res in self.redis.lrange(self.result_key, 0, -1)]

    def get_done_index(self):
        return [res.decode() for res in self.redis.lrange(self.done_idxs_key, 0, -1)]
