#!/bin/bash

# Загрузка переменных
if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport
else
    echo "Ошибка: файл .env не найден."
    exit 1
fi

DB_SERVICE="${DB_HOST}"
BACKUP_FILE="./backups/latest.sql"
DB_VOLUME_NAME="svch_kurs_db_data"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Ошибка: файл резервной копии '${BACKUP_FILE}' не найден."
    exit 1
fi

echo "--- НАЧИНАЕМ ПРОЦЕСС ВОССТАНОВЛЕНИЯ ---"

echo "1/4. Остановка контейнеров..."
docker compose stop

echo "Удаление контейнеров..."
docker compose rm -f

echo "2/4. Удаление тома PostgreSQL (${DB_VOLUME_NAME})..."
docker volume rm "${DB_VOLUME_NAME}"

echo "3/4. Перезапуск контейнеров..."
docker compose up -d --force-recreate

echo "Ожидание запуска PostgreSQL (10 секунд)..."
sleep 10

echo "4/4. Восстановление данных из ${BACKUP_FILE}..."

docker compose exec -T "${DB_SERVICE}" psql \
  -U "${POSTGRES_USER}" \
  -d "${POSTGRES_DB}" \
  < "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
    echo "Восстановление успешно завершено."
else
    echo "ОШИБКА: восстановление не удалось."
    exit 1
fi
