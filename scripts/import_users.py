import pandas as pd
import psycopg2
from datetime import datetime
import bcrypt

# Чтение Excel файла
df = pd.read_excel('users.xlsx', sheet_name='Лист1')

# Подключение к PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    database="Gymside",
    user="postgres",
    password="315101",
    port="5432"
)
cursor = conn.cursor()

# Функция для преобразования значений
def safe_float(value):
    if pd.isna(value) or value == '':
        return None
    try:
        return float(value)
    except:
        return None

def safe_str(value):
    if pd.isna(value) or value == '':
        return None
    return str(value).strip()

# Функция для хеширования пароля
def hash_password(password):
    if pd.isna(password) or password == '':
        return None
    try:
        # Хешируем пароль с солью (15 раундов, как в вашем Node.js коде)
        hashed = bcrypt.hashpw(str(password).strip().encode('utf-8'), bcrypt.gensalt(rounds=15))
        return hashed.decode('utf-8')  # Преобразуем bytes в строку для хранения в БД
    except Exception as e:
        print(f"Ошибка при хешировании пароля: {e}")
        return None

df.columns = [col.replace('\n', ' ').strip() for col in df.columns]

# Заполнение данных
for index, row in df.iterrows():
    # Генерация ID (можно изменить на вашу логику генерации ID)
    user_id = index + 1
    
    # Основные данные пользователя
    name = safe_str(row['name'])
    surname = safe_str(row['surname'])
    phone = safe_str(row['phone'])
    password = hash_password(row['password'])  # Хешируем пароль
    role = safe_str(row['role'])
    sex = safe_str(row['sex'])
    birthdate = safe_str(row['birthdate'])
    created_at = datetime.now()
    updated_at = datetime.now()

    # Проверяем, что обязательные поля не None
    if not all([name, surname, phone, password]):
        print(f"Пропуск пользователя {name}: отсутствуют обязательные поля")
        continue

    # ★★★★ ДОБАВЛЕННАЯ ПРОВЕРКА НА СУЩЕСТВОВАНИЕ ПОЛЬЗОВАТЕЛЯ ★★★★
    check_query = "SELECT COUNT(*) FROM public.users WHERE phone = %s"
    cursor.execute(check_query, (phone,))
    exists = cursor.fetchone()[0] > 0

    if exists:
        print(f"Пользователь с телефоном {phone} уже существует, пропускаем")
        continue
    # ★★★★ КОНЕЦ ДОБАВЛЕННОГО КОДА ★★★★

    # SQL запрос
    insert_query = """
    INSERT INTO public.users(
        "idUser", "name", "surname", "phone", "role", "sex", "birthdate", 
        "password", "createdAt", "updatedAt"
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    # Параметры для вставки
    params = (
        user_id, name, surname, phone, role, sex, birthdate, 
        password, created_at, updated_at
    )
    
    try:
        cursor.execute(insert_query, params)
        print(f"Успешно добавлен пользователь: {name}")
    except Exception as e:
        print(f"Ошибка при добавлении пользователя {name}: {e}")
        conn.rollback()
        break

# Фиксация изменений и закрытие соединения
conn.commit()
cursor.close()
conn.close()

print("Заполнение базы данных завершено!")