import { useState } from "react";
import api from "../../api/api";
import StepBasic from "./steps/StepBasic";
import StepVenue from "./steps/StepVenue";
import StepPoster from "./steps/StepPoster";
import toast from "react-hot-toast";
export default function CreateEvent() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    title: "",
    description: "",
    mode: "",
    startTime: "",
    endTime: "",
    venueId: "",
    poster: null,
  });
  <LoadingButton loading={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
  Create Event
</LoadingButton>


  async function submit() {
    try {
      const res = await api.post("/events", data);
      toast.success("Event submitted for approval!");
      window.location.href = "/club/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create event");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-6">

      <h1 className="text-2xl font-bold">Create Event</h1>

      {step === 1 && (
        <StepBasic data={data} setData={setData} next={() => setStep(2)} />
      )}

      {step === 2 && (
        <StepVenue
          data={data}
          setData={setData}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <StepPoster
          data={data}
          setData={setData}
          back={() => setStep(2)}
          submit={submit}
        />
      )}
    </div>
  );
}
