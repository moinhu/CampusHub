export default function StepPoster({ data, setData, back, submit }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setData({ ...data, poster: reader.result }); // base64
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Event Poster</h2>

      <input type="file" accept="image/*" onChange={handleFile} />

      {data.poster && (
        <img
          src={data.poster}
          alt="Preview"
          className="w-64 rounded shadow border"
        />
      )}

      <div className="flex gap-2">
        <button onClick={back} className="px-4 py-2 bg-gray-400 text-white rounded">
          Back
        </button>

        <button
          onClick={submit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Event
        </button>
      </div>
    </div>
  );
}
