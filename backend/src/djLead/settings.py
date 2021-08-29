"""Settings file """
import environ
from pathlib import Path
import redis

env = environ.Env()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-=-3dwexcyfmynqxto#yy_n@g%m-fh!yz()-#f1=l786)*r=1i-'
# SECRET_KEY = env('DJANGO_SECRET_KEY')


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DJANGO_DEBUG", True)

if DEBUG:
    # If Debug is True, allow all.
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=['example.com'])


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # third party
    'rest_framework',
    'corsheaders',
    # project apps
    'leads',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'djLead.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djLead.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# Databases
# DATABASES = {
#     "default": env.db("DATABASE_URL")
# }
# DATABASES["default"]["ATOMIC_REQUESTS"] = True
# DATABASES["default"]["CONN_MAX_AGE"] = env.int("CONN_MAX_AGE", default=60)


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.ModelBackend',
# ]
# # User Model Definition
# AUTH_USER_MODEL = 'usermodel.User'

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_TZ = True

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Admin, never have admin on the default URL. With DJANGO_ADMIN_URL env variable 
# you will be able to set it different for every environment: production, staging, 
# but leave default for local development.
ADMIN_URL = env('DJANGO_ADMIN_URL', default='admin/')

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django Rest Framework config
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
        'rest_framework.permissions.AllowAny'
    ]
}

CORS_ORIGIN_ALLOW_ALL = True

# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Redis Settings
# REDIS_URL = env('REDIS_URL', default=None)

# if REDIS_URL:
#     CACHES = {
#         "default": env.cache('REDIS_URL')
#     }

# That's a very simple logging, that should output everything 
# to console from all modules with level of DEBUG, which means output everything it can.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler'
        },
    },
    'loggers': {
        '': {  # 'catch all' loggers by referencing it with the empty string
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}

EMAIL_BACKEND = 'post_office.EmailBackend'

DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='yes_johnny@protonmail.com')

POST_OFFICE = {
    'BACKENDS': {
        'default': 'django_ses.SESBackend',
    },
    'DEFAULT_PRIORITY': 'now',
}

################### TBD ######################################
# AWS_SES_REGION_NAME = env('AWS_SES_REGION_NAME', default='us-east-1')
# AWS_SES_REGION_ENDPOINT = env('AWS_SES_REGION_ENDPOINT', default='email.us-east-1.amazonaws.com')
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY


# Cache

APP_REDIS_HOST = env.str('APP_REDIS_HOST')
APP_REDIS_PORT = env.str('APP_REDIS_PORT')
CACHES = {
    'default': {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://{}:{}".format(APP_REDIS_HOST, APP_REDIS_PORT),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
        "KEY_PREFIX": "djLead",
    },
}

REDIS_ROOT_NS = 'djLead'

# CELERY CONFIG
# Settings for Celery
CELERY_BROKER_URL = 'redis://{}:{}/0'.format(APP_REDIS_HOST, APP_REDIS_PORT)
CELERY_RESULT_BACKEND = 'redis://{}'.format(APP_REDIS_HOST)
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_RESULT_SERIALIZER = 'json'

CELERY_TIMEZONE = TIME_ZONE
# All Celery tasks must be imported here
CELERY_IMPORTS = (
    'leads.tasks',
)
# Enable timeout and retry when task is running forever
CELERY_TASK_SOFT_TIME_LIMIT = 60 * 10   # 10 min    Soft time limit exception can be catched > can retry the task
# CELERY_TASK_TIME_LIMIT = 60 * 10    # 10 min      Hard time limit exception will send exit signal to worker process
