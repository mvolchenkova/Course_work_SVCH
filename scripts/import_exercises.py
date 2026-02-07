import pandas as pd
import psycopg2
from datetime import datetime

# Чтение Excel файла
df = pd.read_excel('База упражнений фитнес-приложение.xlsx', sheet_name='Лист1')

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

df.columns = [col.replace('\n', ' ').strip() for col in df.columns]

# Заполнение данных
for index, row in df.iterrows():
    # Генерация ID (можно изменить на вашу логику генерации ID)
    exercise_id = index + 1
    
    # Основные данные упражнения
    ex_name = safe_str(row['Упражнение'])
    front_delta = safe_float(row['front delta'])
    middle_delta = safe_float(row['middle delta'])
    back_delta = safe_float(row['back delta'])
    trapezoids = safe_float(row['trapezoids'])
    diamondshaped = safe_float(row['diamondshaped'])
    biceps = safe_float(row['biceps'])
    triceps = safe_float(row['triceps'])
    big_chest = safe_float(row['big chest'])
    middle_chest = safe_float(row['middle chest'])
    small_chest = safe_float(row['small chest'])
    forearm = safe_float(row['forearm'])
    latissimus = safe_float(row['latissimus'])
    straight_belly = safe_float(row['straight belly'])
    external_oblique = safe_float(row['external oblique'])
    internal_oblique = safe_float(row['internal oblique'])
    transverse = safe_float(row['transverse'])
    straight_hips = safe_float(row['straight hips'])
    quadriceps = safe_float(row['quadriceps'])
    biceps_hips = safe_float(row['biceps hips'])
    big_gluteal = safe_float(row['big gluteal'])
    middle_gluteal = safe_float(row['middle gluteal'])
    small_gluteal = safe_float(row['small gluteal'])
    gastrocnemius = safe_float(row['gastrocnemius'])
    soleus = safe_float(row['soleus'])
    experience = safe_str(row['experience'])
    predominant_muscle_group = safe_str(row['predominant muscle group'])
    base_isolation = safe_str(row['base/isolation'])
    exercise_type = safe_str(row['type'])
    restrictions = safe_str(row['restrictions'])
    
    # Дополнительные поля (заполняем None, так как их нет в Excel)
    equipment = None
    created_at = datetime.now()
    updated_at = datetime.now()

    # SQL запрос
    insert_query = """
    INSERT INTO public.exercises(
        "idExercise", "exName", "frontDelta", "middleDelta", "backDelta", 
        trapezoids, diamondshaped, biceps, triceps, "bigChest", "middleChest", 
        "smallChest", forearm, latissimus, "straightBelly", "externalOblique", 
        "internalOblique", transverse, "straightHips", quadriceps, "bicepsHips", 
        "bigGluteal", "middleGluteal", "smallGluteal", gastrocnemius, soleus, 
        experience, "predominantMuscleGroup", "baseIsolation", type, restrictions, 
        equipment, "createdAt", "updatedAt"
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
              %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    # Параметры для вставки
    params = (
        exercise_id, ex_name, front_delta, middle_delta, back_delta,
        trapezoids, diamondshaped, biceps, triceps, big_chest, middle_chest,
        small_chest, forearm, latissimus, straight_belly, external_oblique,
        internal_oblique, transverse, straight_hips, quadriceps, biceps_hips,
        big_gluteal, middle_gluteal, small_gluteal, gastrocnemius, soleus,
        experience, predominant_muscle_group, base_isolation, exercise_type,
        restrictions, equipment, created_at, updated_at
    )
    
    try:
        cursor.execute(insert_query, params)
        print(f"Успешно добавлено упражнение: {ex_name}")
    except Exception as e:
        print(f"Ошибка при добавлении упражнения {ex_name}: {e}")
        conn.rollback()
        break

# Фиксация изменений и закрытие соединения
conn.commit()
cursor.close()
conn.close()

print("Заполнение базы данных завершено!")