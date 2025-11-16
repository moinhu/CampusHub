export default function StepBasic({ data, setData, next }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Event Basics</h2>

      <input
        type="text"
        placeholder="Event Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <textarea
        placeholder="Event Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        className="border p-2 w-full rounded h-24"
      />

      <select
        value={data.mode}
        onChange={(e) => setData({ ...data, mode: e.target.value })}
        className="border p-2 w-full rounded"
      >
        <option value="">Select Mode</option>
        <option value="Technical">Technical</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
        <option value="Workshop">Workshop</option>
        <option value="Fest">Fest</option>
      </select>

      <button
        onClick={next}
        disabled={!data.title || !data.mode}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
}
