#!/bin/bash
if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport

else
    echo "Ошибка: файл .env не найден."
    exit 1
fi
SCRIPT_ROOT="$(dirname "$(readlink -f "$0")")"
BACKUPS_DIR="${SCRIPT_ROOT}/backups"
DB_SERVICE="${DB_HOST}"
docker-compose exec -T "${DB_SERVICE}" pg_dump ...
DUMP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
echo "--- Начинаем создание резервной копии БД '${POSTGRES_DB}' ---"
docker-compose exec -T "${DB_SERVICE}" pg_dump -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -c -F p > "${BACKUPS_DIR}/${DUMP_FILE}"
if [ $? -eq 0 ]; then
    echo "Успешно. Дамп сохранен в: backups/${DUMP_FILE}"
    ln -sf "${BACKUPS_DIR}/${DUMP_FILE}" "${BACKUPS_DIR}/latest.sql"
else
    echo " Ошибка при выполнении pg_dump."
    exit 1
fi
