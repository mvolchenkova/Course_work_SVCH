import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeightsThunk, addWeightThunk } from "../../slices/weightSlice";
import "./WeightDiary.css";
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

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
  const chartRef = useRef(null);
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

  const handleDownloadReport = async () => {
    try {
        if (sortedWeights.length === 0) return;

        // 2. Инициализация (убедимся, что параметры - строки)
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const accentColor = [0, 200, 220];
        
        // Шапка
        doc.setFillColor(245, 245, 245);
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("WEIGHT PROGRESS REPORT", 14, 25);

        // 3. Захват графика с проверкой
        if (chartRef.current) {
            const canvas = await html2canvas(chartRef.current, {
                scale: 2, // Улучшаем качество скриншота
                logging: false,
                useCORS: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            
            // Проверяем, что imgData не пустой
            if (imgData && imgData !== "data:,") {
                // Вставляем изображение: x, y, width, height
                doc.addImage(imgData, 'PNG', 14, 70, 180, 90, undefined, 'FAST');
            }
        }

        // 4. Статистика
        const startW = Number(sortedWeights[0].weight);
        const currentW = Number(sortedWeights[sortedWeights.length - 1].weight);
        const diff = (currentW - startW).toFixed(1);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Start: ${startW} kg`, 14, 55);
        doc.text(`Current: ${currentW} kg`, 60, 55);
        doc.text(`Change: ${diff > 0 ? '+' : ''}${diff} kg`, 110, 55);

        // 5. Таблица (используем плагин autotable через doc.autoTable)
        const tableRows = sortedWeights.map(w => [
            new Date(w.date).toLocaleDateString(),
            `${w.weight} kg`
        ]);

        doc.autoTable({
            startY: 170, // Смещаем ниже графика
            head: [['Date', 'Weight']],
            body: tableRows,
            headStyles: { fillColor: accentColor },
            margin: { left: 14, right: 14 }
        });

        doc.save(`Weight_Report_${userId}.pdf`);

    } catch (err) {
        console.error("Ошибка при генерации PDF:", err);
        alert("Не удалось создать отчет. Проверьте консоль для деталей.");
    }
};

  return (
    <div className="weight-diary-container artika">
      <h2>Дневник веса</h2>

      <div className="weight-inputs artika">
        <input
          type="number"
          step="0.1"
          placeholder="Вес (kg)"
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
        />

        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />

        <button onClick={handleAddWeight}>Добавить</button>
        <button onClick={handleDownloadReport}>Отчет</button>
      </div>

      {sortedWeights.length > 0 ? (
        <div ref={chartRef} style={{ width: "800px", height: "350px", marginTop: "30px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>Еще нет записей</p>
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