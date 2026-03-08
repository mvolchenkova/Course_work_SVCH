import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeightsThunk, addWeightThunk } from "../../slices/weightSlice";
import "./WeightDiary.css";

// Импортируем компоненты из Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Регистрируем необходимые элементы графика
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeightDiary() {
  const dispatch = useDispatch();
  const userId = Number(localStorage.getItem("userId"));

  const weights = useSelector((state) =>
    Array.isArray(state.weights?.entries) ? state.weights.entries : []
  );

  const [weightInput, setWeightInput] = useState("");
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchWeightsThunk(userId));
    }
  }, [dispatch, userId]);

  const handleAddWeight = () => {
    if (!weightInput || !userId) return;

    dispatch(
      addWeightThunk({
        userId,
        weight: Number(weightInput),
        date: dateInput,
      })
    );

    setWeightInput("");
  };

  const sortedWeights = [...weights].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = {
    // Подписи по оси X (даты)
    labels: sortedWeights.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Weight",
        // Значения по оси Y (вес)
        data: sortedWeights.map((entry) => Number(entry.weight)),
        borderColor: "#00C8DC", // Тот же цвет, что был у вас
        backgroundColor: "rgba(0, 200, 220, 0.5)",
        tension: 0.3, // Делает линию плавной (аналог type="monotone")
        borderWidth: 3,
        pointRadius: 4, // Размер точек на графике
      },
    ],
  };

  // ✅ настройки графика
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Скрываем легенду, если она не нужна
      },
      tooltip: {
        callbacks: {
          // Форматируем всплывающую подсказку, чтобы добавить "kg"
          label: (context) => `${context.parsed.y} kg`,
        },
      },
    },
    scales: {
      y: {
        // Чтобы график не начинался с 0 (если вес около 70кг, нет смысла показывать 0)
        min: Math.min(...sortedWeights.map((w) => Number(w.weight))) - 5,
        max: Math.max(...sortedWeights.map((w) => Number(w.weight))) + 5,
      },
    },
  };

  return (
    <div className="weight-diary-container artika">
      <h2>Weight Diary</h2>

      <div className="weight-inputs artika">
        <input
          type="number"
          step="0.1"
          placeholder="Weight (kg)"
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
        />

        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />

        <button onClick={handleAddWeight}>Add</button>
      </div>

      {sortedWeights.length > 0 ? (
        <div style={{ width: "800px", height: "350px", marginTop: "30px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>No weight records yet</p>
      )}

      <div className="weight-list">
        {sortedWeights.map((entry) => (
          <div key={entry.id} className="weight-item">
            <span>{new Date(entry.date).toLocaleDateString()}</span>
            <span>{Number(entry.weight)} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
}