--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-11-19 14:50:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 878 (class 1247 OID 49727)
-- Name: enum_tasks_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_tasks_status AS ENUM (
    'pending',
    'in_progress',
    'completed'
);


ALTER TYPE public.enum_tasks_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 234 (class 1259 OID 49790)
-- Name: advice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.advice (
    "adviceId" bigint NOT NULL,
    title text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.advice OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 49789)
-- Name: advice_adviceId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."advice_adviceId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."advice_adviceId_seq" OWNER TO postgres;

--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 233
-- Name: advice_adviceId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."advice_adviceId_seq" OWNED BY public.advice."adviceId";


--
-- TOC entry 230 (class 1259 OID 49772)
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    "idArticle" bigint NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    author text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 49771)
-- Name: articles_idArticle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."articles_idArticle_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."articles_idArticle_seq" OWNER TO postgres;

--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 229
-- Name: articles_idArticle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."articles_idArticle_seq" OWNED BY public.articles."idArticle";


--
-- TOC entry 238 (class 1259 OID 49808)
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    "idExercise" bigint NOT NULL,
    "exName" character varying(255) NOT NULL,
    "frontDelta" bigint,
    "middleDelta" bigint,
    "backDelta" bigint,
    trapezoids bigint,
    diamondshaped bigint,
    biceps bigint,
    triceps bigint,
    "bigChest" bigint,
    "middleChest" bigint,
    "smallChest" bigint,
    forearm bigint,
    latissimus bigint,
    "straightBelly" bigint,
    "externalOblique" bigint,
    "internalOblique" bigint,
    transverse bigint,
    "straightHips" bigint,
    quadriceps bigint,
    "bicepsHips" bigint,
    "bigGluteal" bigint,
    "middleGluteal" bigint,
    "smallGluteal" bigint,
    gastrocnemius bigint,
    soleus bigint,
    experience character varying(255) NOT NULL,
    "predominantMuscleGroup" character varying(255) NOT NULL,
    "baseIsolation" character varying(255) NOT NULL,
    type character varying(255),
    restrictions character varying(255),
    equipment character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 49807)
-- Name: exercises_idExercise_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."exercises_idExercise_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."exercises_idExercise_seq" OWNER TO postgres;

--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 237
-- Name: exercises_idExercise_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."exercises_idExercise_seq" OWNED BY public.exercises."idExercise";


--
-- TOC entry 222 (class 1259 OID 49713)
-- Name: favtplans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favtplans (
    "idTplan" bigint NOT NULL,
    author text NOT NULL,
    title text NOT NULL,
    amount integer NOT NULL,
    img text NOT NULL,
    "userIdUser" bigint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.favtplans OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 49712)
-- Name: favtplans_idTplan_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."favtplans_idTplan_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."favtplans_idTplan_seq" OWNER TO postgres;

--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 221
-- Name: favtplans_idTplan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."favtplans_idTplan_seq" OWNED BY public.favtplans."idTplan";


--
-- TOC entry 236 (class 1259 OID 49799)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    "ingredientId" bigint NOT NULL,
    "ingredientName" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 49798)
-- Name: ingredients_ingredientId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ingredients_ingredientId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ingredients_ingredientId_seq" OWNER TO postgres;

--
-- TOC entry 5023 (class 0 OID 0)
-- Dependencies: 235
-- Name: ingredients_ingredientId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ingredients_ingredientId_seq" OWNED BY public.ingredients."ingredientId";


--
-- TOC entry 240 (class 1259 OID 49817)
-- Name: instructions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instructions (
    "instructionId" bigint NOT NULL,
    "instructionName" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.instructions OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 49816)
-- Name: instructions_instructionId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."instructions_instructionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."instructions_instructionId_seq" OWNER TO postgres;

--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 239
-- Name: instructions_instructionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."instructions_instructionId_seq" OWNED BY public.instructions."instructionId";


--
-- TOC entry 232 (class 1259 OID 49781)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    "questionId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    text text NOT NULL,
    email text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 49780)
-- Name: questions_questionId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."questions_questionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."questions_questionId_seq" OWNER TO postgres;

--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 231
-- Name: questions_questionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."questions_questionId_seq" OWNED BY public.questions."questionId";


--
-- TOC entry 226 (class 1259 OID 49754)
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    "idRecipe" bigint NOT NULL,
    title text NOT NULL,
    ingredients text[] NOT NULL,
    instructions text[] NOT NULL,
    img text,
    "time" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 49753)
-- Name: recipes_idRecipe_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."recipes_idRecipe_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."recipes_idRecipe_seq" OWNER TO postgres;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 225
-- Name: recipes_idRecipe_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."recipes_idRecipe_seq" OWNED BY public.recipes."idRecipe";


--
-- TOC entry 228 (class 1259 OID 49763)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    "idReview" bigint NOT NULL,
    "idUser" bigint NOT NULL,
    text character varying(255) NOT NULL,
    rating integer NOT NULL,
    email text,
    username character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 49762)
-- Name: reviews_idReview_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."reviews_idReview_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."reviews_idReview_seq" OWNER TO postgres;

--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 227
-- Name: reviews_idReview_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."reviews_idReview_seq" OWNED BY public.reviews."idReview";


--
-- TOC entry 224 (class 1259 OID 49734)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    "idTask" bigint NOT NULL,
    "idUser" bigint NOT NULL,
    title text NOT NULL,
    description text,
    "dueDate" timestamp with time zone,
    status public.enum_tasks_status DEFAULT 'pending'::public.enum_tasks_status,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userIdUser" integer
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 49733)
-- Name: tasks_idTask_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tasks_idTask_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."tasks_idTask_seq" OWNER TO postgres;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 223
-- Name: tasks_idTask_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tasks_idTask_seq" OWNED BY public.tasks."idTask";


--
-- TOC entry 218 (class 1259 OID 49691)
-- Name: trainingplans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trainingplans (
    "idTplan" bigint NOT NULL,
    author text NOT NULL,
    title text NOT NULL,
    amount integer NOT NULL,
    img text NOT NULL,
    description text,
    lessons character varying(255)[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.trainingplans OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 49690)
-- Name: trainingplans_idTplan_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."trainingplans_idTplan_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."trainingplans_idTplan_seq" OWNER TO postgres;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 217
-- Name: trainingplans_idTplan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."trainingplans_idTplan_seq" OWNED BY public.trainingplans."idTplan";


--
-- TOC entry 220 (class 1259 OID 49700)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "idUser" integer NOT NULL,
    surname text NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    birthdate timestamp with time zone NOT NULL,
    sex text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    diploma text,
    "trAim" integer,
    "finishedTr" integer,
    "lastTrainingDate" timestamp with time zone,
    "isBlocked" boolean DEFAULT false,
    "favPlans" bigint[] DEFAULT ARRAY[]::bigint[],
    "favRecipes" bigint[] DEFAULT ARRAY[]::bigint[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 49699)
-- Name: users_idUser_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users_idUser_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."users_idUser_seq" OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_idUser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users_idUser_seq" OWNED BY public.users."idUser";


--
-- TOC entry 4813 (class 2604 OID 49840)
-- Name: advice adviceId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advice ALTER COLUMN "adviceId" SET DEFAULT nextval('public."advice_adviceId_seq"'::regclass);


--
-- TOC entry 4811 (class 2604 OID 49841)
-- Name: articles idArticle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN "idArticle" SET DEFAULT nextval('public."articles_idArticle_seq"'::regclass);


--
-- TOC entry 4815 (class 2604 OID 49811)
-- Name: exercises idExercise; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises ALTER COLUMN "idExercise" SET DEFAULT nextval('public."exercises_idExercise_seq"'::regclass);


--
-- TOC entry 4806 (class 2604 OID 49842)
-- Name: favtplans idTplan; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favtplans ALTER COLUMN "idTplan" SET DEFAULT nextval('public."favtplans_idTplan_seq"'::regclass);


--
-- TOC entry 4814 (class 2604 OID 49843)
-- Name: ingredients ingredientId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN "ingredientId" SET DEFAULT nextval('public."ingredients_ingredientId_seq"'::regclass);


--
-- TOC entry 4816 (class 2604 OID 49844)
-- Name: instructions instructionId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructions ALTER COLUMN "instructionId" SET DEFAULT nextval('public."instructions_instructionId_seq"'::regclass);


--
-- TOC entry 4812 (class 2604 OID 49845)
-- Name: questions questionId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN "questionId" SET DEFAULT nextval('public."questions_questionId_seq"'::regclass);


--
-- TOC entry 4809 (class 2604 OID 49846)
-- Name: recipes idRecipe; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN "idRecipe" SET DEFAULT nextval('public."recipes_idRecipe_seq"'::regclass);


--
-- TOC entry 4810 (class 2604 OID 49847)
-- Name: reviews idReview; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN "idReview" SET DEFAULT nextval('public."reviews_idReview_seq"'::regclass);


--
-- TOC entry 4807 (class 2604 OID 49848)
-- Name: tasks idTask; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN "idTask" SET DEFAULT nextval('public."tasks_idTask_seq"'::regclass);


--
-- TOC entry 4800 (class 2604 OID 49694)
-- Name: trainingplans idTplan; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainingplans ALTER COLUMN "idTplan" SET DEFAULT nextval('public."trainingplans_idTplan_seq"'::regclass);


--
-- TOC entry 4801 (class 2604 OID 49703)
-- Name: users idUser; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN "idUser" SET DEFAULT nextval('public."users_idUser_seq"'::regclass);


--
-- TOC entry 5007 (class 0 OID 49790)
-- Dependencies: 234
-- Data for Name: advice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.advice ("adviceId", title, text, "createdAt", "updatedAt") FROM stdin;
1	Mindfulness Practice	Incorporate meditation and mindfulness practices into your routine. These can help reduce stress levels, improve concentration, and enhance overall mental well-being.	2024-12-12 00:10:27.332+03	2024-12-12 00:10:27.332+03
2	Quality Sleep	Establish a regular sleep schedule by going to bed and waking up at the same time each day. This helps regulate your biological clock and improves sleep quality.\nEnsure darkness, silence, and a comfortable temperature in your bedroom. Use comfortable mattresses and pillows for better rest.	2024-12-12 00:11:07.416+03	2024-12-12 00:11:07.416+03
3	Regular Medical Check-ups	Regular medical check-ups can help identify diseases at an early stage. Discuss with your doctor how often you should get check-ups based on your age and health status.\nDon’t forget about vaccinations. They help prevent the development of infectious diseases and protect not only you but also those around you.	2024-12-12 00:11:30.804+03	2024-12-12 00:11:30.804+03
4	Rest in a sanatorium	It is most pleasant to spend a vacation by the sea, so we recommend combining business with pleasure.	2024-12-23 21:22:05.697+03	2024-12-23 21:22:05.697+03
5	Giving up bad habits	A very important point that speaks for itself. And most importantly, remember that your bad habits harm not only you, but also your loved ones, first of all, children.	2024-12-23 21:22:32.624+03	2024-12-23 21:22:32.624+03
6	Breathing	It would seem that there is nothing special about it... But it is really important. Having mastered the technique of diaphragmatic breathing, you will be able to do a lot: control your psycho-emotional state, be able to calm down in a stressful situation, slow down aging, get rid of acne and much more.	2024-12-23 21:22:58.209+03	2024-12-23 21:22:58.209+03
\.


--
-- TOC entry 5003 (class 0 OID 49772)
-- Dependencies: 230
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles ("idArticle", title, content, author, "createdAt", "updatedAt") FROM stdin;
1	Периодизация в тренировочном процессе	https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://thebasefitness.ru/article/periodizaciya-trenirovochnogo-processa/&ved=2ahUKEwiM-amagLWKAxUhFRAIHZsbGMwQFnoECBgQAw&usg=AOvVaw2_CZqgTFp01cMoSAxfvBw	Дмитрий Миранков	2024-12-20 02:38:37.538+03	2024-12-20 02:38:37.538+03
2	Питьевой режим 	http://mocgeoz.by/stati/pitevoj-rezhim-racionalnogo-pitanij	Марина Волченкова	2024-12-20 02:42:49.71+03	2024-12-20 02:42:49.71+03
3	Influence of sugar	https://alexfitness.ru/fitness_guide/vliyanie_sahara_na_organizm	Tom Brown	2024-12-23 21:17:19.751+03	2024-12-23 21:17:19.751+03
4	Training while pregnant	https://alexfitness.ru/fitness_guide/osobennosti_fitnes_trenirovok_dlya_beremennyh	Jane Crowd	2024-12-23 21:17:57.23+03	2024-12-23 21:17:57.23+03
5	Training after 40	https://alexfitness.ru/fitness_guide/kak_pravilno_zanimatsya_sportom_v_40_let	Max Tompson	2024-12-23 21:18:39.585+03	2024-12-23 21:18:39.585+03
6	Что такое фитнес-тестирование?	https://alexfitness.ru/fitness_guide/chto_takoe_fitnes_testirovanie	Арина Сидоренко	2024-12-23 21:20:19.141+03	2024-12-23 21:20:19.141+03
\.


--
-- TOC entry 5011 (class 0 OID 49808)
-- Dependencies: 238
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercises ("idExercise", "exName", "frontDelta", "middleDelta", "backDelta", trapezoids, diamondshaped, biceps, triceps, "bigChest", "middleChest", "smallChest", forearm, latissimus, "straightBelly", "externalOblique", "internalOblique", transverse, "straightHips", quadriceps, "bicepsHips", "bigGluteal", "middleGluteal", "smallGluteal", gastrocnemius, soleus, experience, "predominantMuscleGroup", "baseIsolation", type, restrictions, equipment, "createdAt", "updatedAt") FROM stdin;
1	Шраги со штангой	\N	\N	\N	5	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	верхняя часть трапеций	изоляция	тяговое	Проблемы с шеей, плечами, локтями, запястьями	\N	2025-11-18 00:46:08.061572+03	2025-11-18 00:46:08.061577+03
2	Шраги со штангой за спиной	\N	\N	\N	5	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	верхняя часть трапеций	изоляция	тяговое	Проблемы с шеей, плечами, локтями, запястьями	\N	2025-11-18 00:46:08.07779+03	2025-11-18 00:46:08.077794+03
3	Шраги с гантелями	\N	\N	\N	5	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	верхняя часть трапеций	изоляция	тяговое	Проблемы с шеей, плечами, локтями, запястьями	\N	2025-11-18 00:46:08.079544+03	2025-11-18 00:46:08.079549+03
4	Тяга штанги к подбородку	\N	5	\N	5	\N	1	\N	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	средняя дельта	база	тяговое	Проблемы с плечевыми суставами, вращательной манжетой плеча	\N	2025-11-18 00:46:08.081273+03	2025-11-18 00:46:08.081277+03
5	Тяга к лицу с подъёмом наверх	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	задняя дельта, верх спины	изоляция	тяговое	Проблемы с плечевыми суставами	\N	2025-11-18 00:46:08.083038+03	2025-11-18 00:46:08.083042+03
6	IYT-подъёмы на животе	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	трапеция	изоляция	тяговое, разводящее	Проблемы с плечами, нижней частью спины	\N	2025-11-18 00:46:08.084868+03	2025-11-18 00:46:08.084872+03
7	Отведение руки в сторону на блоке	3	5	3	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	средняя дельта	изоляция	разводящее	Проблемы с плечевыми суставами	\N	2025-11-18 00:46:08.086762+03	2025-11-18 00:46:08.086768+03
8	Армейский жим	5	5	\N	\N	\N	\N	3	3	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	передняя дельта	база	жимовое	Проблемы с плечами, локтями, запястьями	\N	2025-11-18 00:46:08.088554+03	2025-11-18 00:46:08.088558+03
9	Жим гантелей над головой	5	5	3	\N	\N	\N	3	3	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	передняя дельта, средняя дельта	база	жимовое	Проблемы с плечами, локтями, запястьями	\N	2025-11-18 00:46:08.090121+03	2025-11-18 00:46:08.090124+03
10	Жим Арнольда	5	5	\N	\N	\N	\N	3	3	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	передняя дельта, средняя дельта	изоляция	жимовое	Проблемы с плечами, локтями, запястьями	\N	2025-11-18 00:46:08.091751+03	2025-11-18 00:46:08.091755+03
11	Обратные разведения в тренажере Peck-Deck	\N	\N	5	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	задняя дельта, верх спины	изоляция	разводящее	Проблемы с плечами, особенно с задними дельтами	\N	2025-11-18 00:46:08.09336+03	2025-11-18 00:46:08.093364+03
12	Разведение гантелей в наклоне	\N	\N	5	2	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	задняя дельта, верх спины	изоляция	разводящее	Проблемы с плечами, особенно с задними дельтами	\N	2025-11-18 00:46:08.094807+03	2025-11-18 00:46:08.09481+03
13	Подъем гантелей перед собой	5	5	\N	2	1	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	передняя дельта	изоляция	жимовое	Проблемы с плечами, особенно с задними дельтами	\N	2025-11-18 00:46:08.097335+03	2025-11-18 00:46:08.097339+03
14	Разведение гантелей стоя	\N	5	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	средняя дельта	изоляция, формирующее	жимовое	Проблемы с плечами, особенно с задними дельтами	\N	2025-11-18 00:46:08.098991+03	2025-11-18 00:46:08.098994+03
15	Подъем гантелей над головой через стороны	3	5	3	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	средняя дельта	изоляция, формирующее	разводящее	Проблемы с плечами, особенно с задними дельтами	\N	2025-11-18 00:46:08.100789+03	2025-11-18 00:46:08.100793+03
16	Жим штанги узким хватом лежа	2	\N	\N	\N	\N	\N	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	трицепс	база	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.103435+03	2025-11-18 00:46:08.103441+03
17	Французский жим лежа	1	1	1	\N	\N	\N	5	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	трицепс	изоляция	жимовое	Проблемы с локтями	\N	2025-11-18 00:46:08.106002+03	2025-11-18 00:46:08.10601+03
18	Французский жим EZ-штанги сидя	1	1	1	\N	\N	\N	5	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	длинная головка трицепса	изоляция, формирующее	жимовое	Проблемы с локтями	\N	2025-11-18 00:46:08.107718+03	2025-11-18 00:46:08.107722+03
19	Французский жим в тренажере сидя	1	1	1	\N	\N	\N	5	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	длинная головка трицепса	изоляция	жимовое	Проблемы с локтями	\N	2025-11-18 00:46:08.109211+03	2025-11-18 00:46:08.109214+03
20	Жим книзу в блочном тренажере	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	латеральная головка трицепса	изоляция, формирующее	жимовое	Проблемы с локтями, запястьями	\N	2025-11-18 00:46:08.110844+03	2025-11-18 00:46:08.110847+03
21	Жим книзу одной рукой обратным хватом	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	латеральная головка трицепса, медиальная головка трицепса	изоляция	жимовое	Проблемы с локтями, запястьями	\N	2025-11-18 00:46:08.112422+03	2025-11-18 00:46:08.112425+03
22	Разгибание руки с гантелью из-за головы	1	1	1	\N	\N	\N	5	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	верх и середина всех головок трицепса	изоляция	жимовое	Проблемы с локтями, плечами	\N	2025-11-18 00:46:08.114021+03	2025-11-18 00:46:08.114024+03
23	Подъем штанги на бицепс стоя	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	бицепс	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.11567+03	2025-11-18 00:46:08.115673+03
24	Подъемы гантелей на бицепс стоя	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	бицепс	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.117523+03	2025-11-18 00:46:08.117527+03
25	Подъем гантелей на бицепс сидя	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	бицепс	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.119368+03	2025-11-18 00:46:08.119373+03
26	Молоток на бицепс	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	боковая часть бицепса	изоляция, формирующее	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.121455+03	2025-11-18 00:46:08.121458+03
27	Подъем EZ-штанги на бицепс в скамье Скотта	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	середина и низ бицепса	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.123239+03	2025-11-18 00:46:08.123243+03
28	Подъем гантелей на бицепс в скамье Скотта	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	середина и низ бицепса	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.12663+03	2025-11-18 00:46:08.126634+03
29	Подъем на бицепс в блочном тренажере стоя	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	середина и низ бицепса, верх предплечья	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.128366+03	2025-11-18 00:46:08.12837+03
30	Сгибание рук на бицепс в кроссовере	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	пик бицепса	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.129907+03	2025-11-18 00:46:08.12991+03
31	Концентрированный подъем на бицепс	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	середина и низ бицепса	изоляция	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.131468+03	2025-11-18 00:46:08.131471+03
32	Подъем штанги на бицепс обратным хватом	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	боковая часть предплечья	изоляция, формирующее	жимовое	Проблемы с локтями, запястьями, плечами	\N	2025-11-18 00:46:08.133231+03	2025-11-18 00:46:08.133236+03
33	Сгибания рук в запястьях	\N	\N	\N	\N	\N	3	\N	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	внутренняя часть предплечья	изоляция, формирующее	тяговое	Проблемы с запястьями	\N	2025-11-18 00:46:08.134948+03	2025-11-18 00:46:08.134952+03
34	Жим штанги лежа	3	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	большая и малая грудная	база	жимовое	Проблемы с плечами, локтями, запястьями, грудным отделом позвоночника	\N	2025-11-18 00:46:08.136642+03	2025-11-18 00:46:08.136646+03
35	Жим штанги на скамье с наклоном	3	\N	\N	\N	\N	\N	3	5	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	верх груди, передние дельты	база	жимовое	Проблемы с плечами, локтями, запястьями, грудным отделом позвоночника	\N	2025-11-18 00:46:08.138712+03	2025-11-18 00:46:08.138719+03
36	Жим штанги на скамье с наклоном вниз	3	\N	\N	\N	\N	\N	3	5	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая грудная	база	жимовое	Проблемы с плечами, локтями, запястьями, грудным отделом позвоночника	\N	2025-11-18 00:46:08.140664+03	2025-11-18 00:46:08.140668+03
37	Жим гантелей лежа	3	\N	\N	\N	\N	\N	3	5	\N	\N	\N	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая грудная	база	жимовое	Проблемы с плечами, локтями, запястьями, грудным отделом позвоночника	\N	2025-11-18 00:46:08.142446+03	2025-11-18 00:46:08.14245+03
38	Жим гантелей на скамье с наклоном вверх	3	\N	\N	2	\N	1	\N	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая и малая грудная	изоляция, формирующее	толчковое	Проблемы с плечами, локтями, запястьями, грудным отделом позвоночника	\N	2025-11-18 00:46:08.144029+03	2025-11-18 00:46:08.144032+03
39	Жим гантелей на скамье с наклоном вниз	3	\N	\N	\N	\N	\N	1	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая и малая грудная	изоляция, формирующее	жимовое	Проблемы с плечами, локтями, запястьями, грудным отделом позвоночника	\N	2025-11-18 00:46:08.145561+03	2025-11-18 00:46:08.145565+03
40	Жим от груди в тренажере сидя	2	2	2	\N	\N	\N	1	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	грудь	формирующее	жимовое	Проблемы с плечами, локтями	\N	2025-11-18 00:46:08.147158+03	2025-11-18 00:46:08.147161+03
41	Разведение гантелей лежа	2	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая грудная	изоляция	толчковое	Проблемы с плечами	\N	2025-11-18 00:46:08.148898+03	2025-11-18 00:46:08.148903+03
42	Разведение гантелей на скамье с наклоном вверх	2	2	\N	2	\N	\N	\N	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая грудная	изоляция	толчковое	Проблемы с плечами	\N	2025-11-18 00:46:08.150847+03	2025-11-18 00:46:08.150851+03
43	Сведения в тренажере Peck-Deck	2	\N	\N	\N	\N	\N	\N	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	грудь	изоляция	разводящее	Проблемы с плечами, грудным отделом позвоночника	\N	2025-11-18 00:46:08.15287+03	2025-11-18 00:46:08.152877+03
44	Сведение в кроссовере через верхние блоки	2	\N	\N	\N	\N	\N	\N	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	грудь	изоляция	тяговое	Проблемы с плечами, грудным отделом позвоночника	\N	2025-11-18 00:46:08.154944+03	2025-11-18 00:46:08.154948+03
45	Сведение в кроссовере через нижние блоки	2	\N	\N	\N	\N	\N	\N	5	\N	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	18+ месяцев	грудь, передняя дельта	изоляция	тяговое	Проблемы с плечами, грудным отделом позвоночника	\N	2025-11-18 00:46:08.156722+03	2025-11-18 00:46:08.156749+03
46	Скручивание на римском стуле	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	верхняя часть пресса	формирующее	тяговое	Проблемы с поясницей, шеей	\N	2025-11-18 00:46:08.158492+03	2025-11-18 00:46:08.158496+03
47	Скручивания на скамье с наклоном вниз	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	5	\N	2	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	нижняя часть пресса, прямая мышца бедра	формирующее	тяговое	Проблемы с поясницей, шеей	\N	2025-11-18 00:46:08.160264+03	2025-11-18 00:46:08.160268+03
48	Скручивание на коленях в болочном тренажере(молитва)	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	5	5	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	верхняя часть пресса и косые мышцы живота	изоляция	тяговое	Проблемы с поясницей, шеей	\N	2025-11-18 00:46:08.161884+03	2025-11-18 00:46:08.161887+03
49	Обратные скручивания	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	нижняя часть пресса	база	тяговое	Проблемы с поясницей, шеей	\N	2025-11-18 00:46:08.163412+03	2025-11-18 00:46:08.163415+03
50	Подъемы коленей в висе	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	нижняя часть пресса, прямая мышца бедра	база	тяговое	Проблемы с плечевыми суставами, запястьями, локтями, поясницей. Не рекомендуется при грыжах и протрузиях	\N	2025-11-18 00:46:08.167735+03	2025-11-18 00:46:08.167741+03
51	Подъемы ног в висе	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	2	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	нижняя часть пресса, прямая мышца бедра	база	тяговое	Проблемы с плечевыми суставами, запястьями, локтями, поясницей. Не рекомендуется при грыжах и протрузиях	\N	2025-11-18 00:46:08.1701+03	2025-11-18 00:46:08.170105+03
52	Косые скручивания	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	5	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	косые мышцы живота	база	тяговое	Проблемы с поясницей	\N	2025-11-18 00:46:08.171985+03	2025-11-18 00:46:08.17199+03
53	Приседания со штангой	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	3	\N	\N	\N	\N	0-6 месяцев	квадрицепс	база	жимовое	Проблемы с коленями, голеностопом, тазобедренными суставами, поясницей	\N	2025-11-18 00:46:08.173781+03	2025-11-18 00:46:08.173785+03
54	Приседания в тренажере Смита	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	3	\N	\N	\N	\N	0-6 месяцев	квадрицепс	база	жимовое	Проблемы с коленями, голеностопом, тазобедренными суставами, поясницей	\N	2025-11-18 00:46:08.17537+03	2025-11-18 00:46:08.175373+03
55	Приседания со штангой на груди в тренажере Смита	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	3	\N	\N	\N	\N	6-18 месяцев	квадрицепс	база	жимовое	Проблемы с коленями, голеностопом, тазобедренными суставами, поясницей	\N	2025-11-18 00:46:08.176895+03	2025-11-18 00:46:08.176899+03
56	Гакк-приседания	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	3	\N	\N	\N	\N	6-18 месяцев	боковая сторона квадрицепса	база, формирующее	жимовое	Проблемы с коленями, голеностопом, тазобедренными суставами, поясницей	\N	2025-11-18 00:46:08.17841+03	2025-11-18 00:46:08.178413+03
57	Жим ногами	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	3	\N	\N	\N	\N	0-6 месяцев	квадрицепс, бицепс бедра	база	жимовое	Проблемы с коленями, голеностопом, тазобедренными суставами, поясницей	\N	2025-11-18 00:46:08.180151+03	2025-11-18 00:46:08.180155+03
58	Выпады со штангой	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	2	\N	\N	\N	\N	6-18 месяцев	квадрицепс, бицепс бедра, большая ягодичная	база	жимовое	Проблемы с коленями, голеностопом	\N	2025-11-18 00:46:08.181812+03	2025-11-18 00:46:08.181816+03
59	Выпады назад	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	2	\N	\N	\N	\N	0-6 месяцев	квадрицепс, бицепс бедра, большая ягодичная	база	толчковое	Проблемы с коленями, голеностопом	\N	2025-11-18 00:46:08.18339+03	2025-11-18 00:46:08.183393+03
60	Зашагивания на платформу	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	5	\N	\N	1	\N	0-6 месяцев	квадрицепс, средняя ягодичная, малая ягодичная	база	толчковое	Проблемы с коленями, голеностопом	\N	2025-11-18 00:46:08.185083+03	2025-11-18 00:46:08.185088+03
61	Разгибания ног	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	\N	\N	\N	0-6 месяцев	прямая мышца бедра, латеральная мышца бедра	изоляция	жимовое	Проблемы с коленями	\N	2025-11-18 00:46:08.187037+03	2025-11-18 00:46:08.187043+03
62	Мертвая тяга	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	\N	\N	\N	\N	6-18 месяцев	бицепс бедра, большая ягодичная	база	тяговое	Проблемы с поясницей, коленями, тазобедренными суставами, запястьями, локтями, плечами. Требует хорошей техники выполнения. Не рекомендуется при грыжах и протрузиях	\N	2025-11-18 00:46:08.189293+03	2025-11-18 00:46:08.189297+03
63	Гиперэкстензия для мышц бедра	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	2	\N	\N	1	\N	0-6 месяцев	бицепс бедра	изоляция, формирующее	тяговое	Проблемы с поясницей	\N	2025-11-18 00:46:08.190954+03	2025-11-18 00:46:08.190958+03
64	Сгибание ног лежа	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	2	\N	0-6 месяцев	бицепс бедра	изоляция	тяговое	Проблемы с коленями	\N	2025-11-18 00:46:08.19263+03	2025-11-18 00:46:08.192634+03
65	Сгибания ног стоя	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	2	\N	6-18 месяцев	низ бицепса бедра	изоляция	тяговое	Проблемы с коленями	\N	2025-11-18 00:46:08.194317+03	2025-11-18 00:46:08.19432+03
66	Сгибания ног сидя	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	\N	\N	\N	2	\N	0-6 месяцев	низ бицепса бедра	изоляция	тяговое	Проблемы с коленями	\N	2025-11-18 00:46:08.195999+03	2025-11-18 00:46:08.196003+03
67	Подъемы на носки стоя	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	\N	1	1	5	\N	0-6 месяцев	икроножная мышца	база	толчковое	Проблемы с голеностопом, ахилловым сухожилием	\N	2025-11-18 00:46:08.197591+03	2025-11-18 00:46:08.197595+03
68	Подъемы на носки в тренажере для жимов ногами	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	0-6 месяцев	икроножная мышца	изоляция	толчковое	Проблемы с голеностопом, ахилловым сухожилием	\N	2025-11-18 00:46:08.199171+03	2025-11-18 00:46:08.199174+03
69	Подъемы на носки сидя	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	0-6 месяцев	Камбаловидная мышца	изоляция	толчковое	Проблемы с голеностопом, ахилловым сухожилием	\N	2025-11-18 00:46:08.200935+03	2025-11-18 00:46:08.200939+03
70	Болгарские выпады	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	3	5	2	2	1	\N	6-18 месяцев	квадрицепс	база	толчковое	Проблемы с коленями, голеностопом	\N	2025-11-18 00:46:08.202881+03	2025-11-18 00:46:08.202885+03
71	Тяга сумо	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	5	5	\N	\N	\N	\N	\N	5	\N	5	\N	\N	\N	\N	6-18 месяцев	спина, квадрицепс	база	тяговое	Проблемы с коленями, тазобедренными суставами, поясницей	\N	2025-11-18 00:46:08.204891+03	2025-11-18 00:46:08.204896+03
72	Плие приседания	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	\N	5	5	5	1	\N	6-18 месяцев	ягодицы, приводящие	база	жимовое	Проблемы с коленями, тазобедренными суставами, поясницей	\N	2025-11-18 00:46:08.20667+03	2025-11-18 00:46:08.206674+03
73	Отведение ноги назад в кроссовере	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	5	\N	\N	\N	\N	0-6 месяцев	ягодицы	изоляция	толчковое	Проблемы с коленями, тазобедренными суставами	\N	2025-11-18 00:46:08.208391+03	2025-11-18 00:46:08.208395+03
74	Отведение ноги вбок в кроссовере	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2	\N	5	4	\N	\N	0-6 месяцев	малая ягодичная, средняя ягодичная	изоляция	тяговое	Проблемы с коленями, тазобедренными суставами	\N	2025-11-18 00:46:08.209968+03	2025-11-18 00:46:08.209972+03
75	Разведение ног сидя в тренажере	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	малая ягодичная, средняя ягодичная	изоляция	толчковое	Проблемы с тазобедренными суставами	\N	2025-11-18 00:46:08.211625+03	2025-11-18 00:46:08.211629+03
76	Сведение ног сидяв тренажере	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	приводящие	изоляция	тяговое	Проблемы с тазобедренными суставами	\N	2025-11-18 00:46:08.213445+03	2025-11-18 00:46:08.213449+03
77	Румынская тяга на одну ногу	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая ягодичная, бицепс бедра	база	тяговое	Проблемы с поясницей, коленями, тазобедренными суставами, запястьями, локтями, плечами. Требует хорошей техники выполнения. Не рекомендуется при грыжах и протрузиях	\N	2025-11-18 00:46:08.215275+03	2025-11-18 00:46:08.215279+03
78	Румынская тяга	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	большая ягодичная, бицепс бедра	база	тяговое	Проблемы с поясницей, коленями, тазобедренными суставами, запястьями, локтями, плечами. Требует хорошей техники выполнения. Не рекомендуется при грыжах и протрузиях	\N	2025-11-18 00:46:08.217111+03	2025-11-18 00:46:08.217115+03
79	Ягодичный мост в тренажере	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	ягодицы, бицепс бедра	база	жимовое	Проблемы с поясницей, тазобедренными суставами	\N	2025-11-18 00:46:08.219291+03	2025-11-18 00:46:08.219297+03
80	Ягодичный мост со штангой	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	ягодицы, бицепс бедра	база	жимовое	Проблемы с поясницей, тазобедренными суставами	\N	2025-11-18 00:46:08.221099+03	2025-11-18 00:46:08.221103+03
81	Становая тяга	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	мышцы выпрямляющие позвоночник, квадрицепс, большая ягодичная	база	тяговое	Проблемы с поясницей, коленями, тазобедренными суставами, запястьями, локтями, плечами. Требует хорошей техники выполнения. Не рекомендуется при грыжах и протрузиях	\N	2025-11-18 00:46:08.222736+03	2025-11-18 00:46:08.22274+03
82	Подтягивания на перекладине	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	широчайшая спины, дельтовидная, бицепс	база	тяговое	Проблемы с плечевыми суставами, локтями, запястьями	\N	2025-11-18 00:46:08.224496+03	2025-11-18 00:46:08.224499+03
83	Подтягивания в гравитроне	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	широчайшая спины, дельтовидная, бицепс	база	тяговое	Проблемы с плечевыми суставами, локтями, запястьями	\N	2025-11-18 00:46:08.22608+03	2025-11-18 00:46:08.226083+03
84	Тяга штанги в наклоне	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	широчайшая спины, большая круглая	база	тяговое	Проблемы с поясницей, локтями, запястьями, плечами	\N	2025-11-18 00:46:08.227997+03	2025-11-18 00:46:08.228001+03
85	Тяга штанги в наклоне обратным хватом	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	широчайшая спины, большая круглая	база	тяговое	Проблемы с поясницей, локтями, запястьями, плечами	\N	2025-11-18 00:46:08.229566+03	2025-11-18 00:46:08.22957+03
86	Тяга Т-штанги	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	широчайшие мышцы и мышцы середины спины	изоляция	тяговое	Проблемы с поясницей, локтями, запястьями, плечами	\N	2025-11-18 00:46:08.23118+03	2025-11-18 00:46:08.231184+03
87	Тяга гантели одной рукой в наклоне	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	широчайшие и ромбовидные мышцы спины	изоляция	тяговое	Проблемы с поясницей, локтями, запястьями, плечами	\N	2025-11-18 00:46:08.232661+03	2025-11-18 00:46:08.232664+03
88	Вертикальная тяга широким хватом	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	верх широчайших мышц спины, трапеций	база	тяговое	Проблемы с поясницей, локтями, запястьями, плечами	\N	2025-11-18 00:46:08.234465+03	2025-11-18 00:46:08.23447+03
89	Вертикальная тяга обратным хватом	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	низ и верх широчайших и ромбовидных мышц	база	тяговое	Проблемы с поясницей, локтями, запястьями, плечами	\N	2025-11-18 00:46:08.236524+03	2025-11-18 00:46:08.236529+03
90	Горизонтальная тяга в блочном тренажере	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0-6 месяцев	низ широчайших мышц спины, ромбовидные мышцы	база	тяговое	Проблемы с поясницей, локтями, запястьями, плечами	\N	2025-11-18 00:46:08.239344+03	2025-11-18 00:46:08.239348+03
91	Пуловер в блочном тренажере стоя	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	6-18 месяцев	широчайшие мышцы спины	изоляция	тяговое	Проблемы с плечами, локтями, запястьями	\N	2025-11-18 00:46:08.240973+03	2025-11-18 00:46:08.240977+03
\.


--
-- TOC entry 4995 (class 0 OID 49713)
-- Dependencies: 222
-- Data for Name: favtplans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favtplans ("idTplan", author, title, amount, img, "userIdUser", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5009 (class 0 OID 49799)
-- Dependencies: 236
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients ("ingredientId", "ingredientName", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5013 (class 0 OID 49817)
-- Dependencies: 240
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instructions ("instructionId", "instructionName", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5005 (class 0 OID 49781)
-- Dependencies: 232
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions ("questionId", "userId", text, email, "createdAt", "updatedAt") FROM stdin;
7	8	когда?	mvolchenkova7@gmail.com	2024-12-11 22:41:27.087+03	2024-12-11 22:41:27.087+03
8	8	Когда добавят искусственный интеллект?	mvolchenkova7@gmail.com	2024-12-11 22:42:31.55+03	2024-12-11 22:42:31.55+03
9	8	где?	mvolchenkova7@gmail.com	2024-12-11 22:47:15.33+03	2024-12-11 22:47:15.33+03
\.


--
-- TOC entry 4999 (class 0 OID 49754)
-- Dependencies: 226
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes ("idRecipe", title, ingredients, instructions, img, "time", "createdAt", "updatedAt") FROM stdin;
11	Creamy Tomato Soup	{"2 tbsp olive oil","1 onion, chopped","4 cloves garlic, minced","2 cans (28 oz each) crushed tomatoes","2 cups vegetable broth","1 tsp sugar","1 tsp dried basil","Salt and pepper to taste"}	{"Sauté the Aromatics: In a large pot, heat the olive oil over medium heat. Add the chopped onion and garlic, cooking until softened, about 5 minutes.","Add the Tomatoes: Stir in the crushed tomatoes, vegetable broth, sugar, basil, salt, and pepper. Bring to a simmer and cook for 15 minutes.","Blend the Soup: Use an immersion blender to blend the soup until smooth. Stir in the heavy cream and heat through.","Serve: Ladle the soup into bowls and garnish with fresh basil if desired."}	63adc57e-cf52-4c50-8159-e3ed11340244.jpg	30	2024-12-03 21:17:56.342+03	2024-12-03 21:17:56.342+03
12	Lemon Garlic Baked Salmon	{"4 salmon fillets","2 tbsp olive oil","3 cloves garlic, minced","Juice of 1 lemo","Salt and pepper to taste","Lemon slices for garnish","Fresh dill (optional)"}	{"Preheat the Oven: Preheat your oven to 400°F (200°C).","Prepare the Marinade: In a small bowl, mix olive oil, minced garlic, lemon juice, salt, and pepper.","Marinate the Salmon: Place salmon fillets on a baking sheet and pour the marinade over them. Let sit for 10 minutes.","Bake: Bake in the preheated oven for 15-20 minutes, or until the salmon flakes easily with a fork. Garnish with lemon slices and fresh dill before serving."}	6a32d8f8-e659-49e1-b152-119539e900cc.jpg	25	2024-12-03 21:20:43.447+03	2024-12-03 21:20:43.447+03
13	Fresh Greek Salad	{"2 cups cherry tomatoes, halved","1 cucumber, diced","1 bell pepper, diced","1 cup Kalamata olives, pitted","200g feta cheese, crumbled","3 tbsp olive oil","Salt and pepper to taste"}	{"Combine Ingredients: In a large bowl, combine cherry tomatoes, cucumber, bell pepper, red onion, and olives.","Make the Dressing: In a small bowl, whisk together olive oil, red wine vinegar, salt, and pepper.","Toss the Salad: Pour the dressing over the salad and toss to combine. Top with crumbled feta cheese and garnish with fresh oregano.","Serve: Enjoy the salad immediately or refrigerate for 30 minutes to enhance the flavors."}	26a12f1d-38f9-4fa3-a3ae-09f864c0cc21.jpg	15	2024-12-03 21:23:12.009+03	2024-12-03 21:23:12.009+03
14	Beef and Broccoli Stir-Fry	{"500g beef sirloin, thinly sliced","2 cups broccoli florets","3 cloves garlic, minced","1 tbsp ginger, minced","1/4 cup soy sauce","2 tbsp vegetable oil","1 tbsp cornstarch"}	{"Marinate the Beef: In a bowl, combine sliced beef, soy sauce, oyster sauce, and cornstarch. Let marinate for 10 minutes.","Stir-Fry the Vegetables: Heat 1 tbsp of oil in a large skillet over medium-high heat. Add broccoli and stir-fry for 3-4 minutes until bright green and tender.","Cook the Beef: Push broccoli to the side and add remaining oil. Add marinated beef and stir-fry until browned, about 5 minutes.","Combine and Serve: Stir everything together and cook for an additional 2 minutes. Serve hot over cooked rice."}	97b295fa-3fc6-468f-b202-375a3a718a9f.jpg	30	2024-12-03 21:25:10.764+03	2024-12-03 21:25:10.764+03
15	Creamy Oatmeal	{"1 cup rolled oats","2 cups water or milk","1/4 tsp salt","2 tbsp honey or maple syrup","1/2 tsp cinnamon","Fresh fruit (for topping)","Nuts or seeds (optional)"}	{"Cook the Oats: In a pot, combine oats, water or milk, and salt. Bring to a boil over medium heat.","Simmer: Reduce heat and simmer for 5-7 minutes, stirring occasionally, until the oats are tender.","Add Sweeteners: Stir in honey or maple syrup and cinnamon. Remove from heat.","Serve: Top with fresh fruit and nuts or seeds if desired."}	65ebdb28-8a9b-4c53-bb8b-664bfaff21ef.jpg	15	2024-12-03 21:28:51.471+03	2024-12-03 21:28:51.471+03
\.


--
-- TOC entry 5001 (class 0 OID 49763)
-- Dependencies: 228
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews ("idReview", "idUser", text, rating, email, username, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4997 (class 0 OID 49734)
-- Dependencies: 224
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks ("idTask", "idUser", title, description, "dueDate", status, "createdAt", "updatedAt", "userIdUser") FROM stdin;
\.


--
-- TOC entry 4991 (class 0 OID 49691)
-- Dependencies: 218
-- Data for Name: trainingplans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trainingplans ("idTplan", author, title, amount, img, description, lessons, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 4993 (class 0 OID 49700)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("idUser", surname, name, phone, password, birthdate, sex, role, diploma, "trAim", "finishedTr", "lastTrainingDate", "isBlocked", "favPlans", "favRecipes", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 233
-- Name: advice_adviceId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."advice_adviceId_seq"', 6, true);


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 229
-- Name: articles_idArticle_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."articles_idArticle_seq"', 6, true);


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 237
-- Name: exercises_idExercise_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."exercises_idExercise_seq"', 1, false);


--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 221
-- Name: favtplans_idTplan_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."favtplans_idTplan_seq"', 1, false);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 235
-- Name: ingredients_ingredientId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ingredients_ingredientId_seq"', 1, false);


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 239
-- Name: instructions_instructionId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."instructions_instructionId_seq"', 1, false);


--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 231
-- Name: questions_questionId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."questions_questionId_seq"', 9, true);


--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 225
-- Name: recipes_idRecipe_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."recipes_idRecipe_seq"', 15, true);


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 227
-- Name: reviews_idReview_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."reviews_idReview_seq"', 27, true);


--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 223
-- Name: tasks_idTask_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tasks_idTask_seq"', 1, false);


--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 217
-- Name: trainingplans_idTplan_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."trainingplans_idTplan_seq"', 42, true);


--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_idUser_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users_idUser_seq"', 58, true);


--
-- TOC entry 4834 (class 2606 OID 49797)
-- Name: advice advice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.advice
    ADD CONSTRAINT advice_pkey PRIMARY KEY ("adviceId");


--
-- TOC entry 4830 (class 2606 OID 49779)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY ("idArticle");


--
-- TOC entry 4838 (class 2606 OID 49815)
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY ("idExercise");


--
-- TOC entry 4822 (class 2606 OID 49720)
-- Name: favtplans favtplans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favtplans
    ADD CONSTRAINT favtplans_pkey PRIMARY KEY ("idTplan");


--
-- TOC entry 4836 (class 2606 OID 49806)
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY ("ingredientId");


--
-- TOC entry 4840 (class 2606 OID 49824)
-- Name: instructions instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY ("instructionId");


--
-- TOC entry 4832 (class 2606 OID 49788)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY ("questionId");


--
-- TOC entry 4826 (class 2606 OID 49761)
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY ("idRecipe");


--
-- TOC entry 4828 (class 2606 OID 49770)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY ("idReview");


--
-- TOC entry 4824 (class 2606 OID 49742)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY ("idTask");


--
-- TOC entry 4818 (class 2606 OID 49698)
-- Name: trainingplans trainingplans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trainingplans
    ADD CONSTRAINT trainingplans_pkey PRIMARY KEY ("idTplan");


--
-- TOC entry 4820 (class 2606 OID 49711)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("idUser");


--
-- TOC entry 4841 (class 2606 OID 49721)
-- Name: favtplans favtplans_userIdUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favtplans
    ADD CONSTRAINT "favtplans_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES public.users("idUser") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4844 (class 2606 OID 49835)
-- Name: reviews reviews_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "reviews_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.users("idUser");


--
-- TOC entry 4842 (class 2606 OID 49743)
-- Name: tasks tasks_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "tasks_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.users("idUser");


--
-- TOC entry 4843 (class 2606 OID 49748)
-- Name: tasks tasks_userIdUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "tasks_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES public.users("idUser") ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-11-19 14:50:36

--
-- PostgreSQL database dump complete
--

