const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getSupabase } = require("./db.js");

dotenv.config();

const supabase = getSupabase(); // <-- ESTA ES LA FORMA CORRECTA

if (!supabase) {
  console.warn("❌ Supabase no está inicializado. Revisa SUPABASE_URL y SUPABASE_KEY.");
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/dishes", async (req, res) => {
  try {
    const { data, error } = await supabase.from("dishes").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("🔥 Error en GET /api/dishes:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/dishes", async (req, res) => {
  const { name, price } = req.body;

  try {
    const { data, error } = await supabase
      .from("dishes")
      .insert([{ name, price }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
