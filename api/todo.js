let todos = [
  { id: 1, item: 'Cek kondisi cuaca', completed: false, category: 'pribadi' },
  { id: 2, item: 'Siapkan tas carrier', completed: false, category: 'pribadi' },
  { id: 3, item: 'Bawa air minum 2-3 liter', completed: false, category: 'pribadi' },
  { id: 4, item: 'Siapkan sepatu hiking', completed: false, category: 'pribadi' },
  { id: 5, item: 'Bawa jaket dan pakaian hangat', completed: false, category: 'pribadi' },
  { id: 6, item: 'Tenda untuk 4 orang', completed: false, category: 'kelompok' },
  { id: 7, item: 'Kompor portable + gas', completed: false, category: 'kelompok' },
  { id: 8, item: 'Perlengkapan P3K', completed: false, category: 'kelompok' },
];
let nextId = 9;

export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(todos);
  } else if (method === 'POST') {
    const { action, payload } = req.body;

    switch (action) {
      case 'add':
        todos.push({ id: nextId++, ...payload });
        break;
      case 'toggle':
        todos = todos.map(todo =>
          todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
        );
        break;
      case 'delete':
        todos = todos.filter(todo => todo.id !== payload.id);
        break;
      case 'reset_all':
        todos = todos.map(todo => ({ ...todo, completed: false }));
        break;
      case 'reset_category':
        todos = todos.map(todo =>
          todo.category === payload.category ? { ...todo, completed: false } : todo
        );
        break;
      default:
        return res.status(400).json({ error: 'Unknown action' });
    }

    res.status(200).json(todos);
  } else {
    res.status(405).end();
  }
}
