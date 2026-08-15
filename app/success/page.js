import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}