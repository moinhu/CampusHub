export default function QRModal({ qr, onClose }) {
  if (!qr) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 grid place-items-center">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Your Entry Pass</h2>
        <img src={qr} alt="QR Code" className="w-48 mx-auto" />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
