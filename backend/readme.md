### Run Celery.
celery -A djLead worker -l INFO

Please refer to Celery docs to change concurrent workers and other settings

### Run Flower
celery -A djLead flower
