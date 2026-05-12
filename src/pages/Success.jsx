export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-serif mb-4 text-green-600">Payment Successful!</h1>
      <p className="text-gray-500 mb-8">Thank you for your purchase. Your order is being processed.</p>
      <a href="/" className="bg-black text-white px-8 py-3">Back to Home</a>
    </div>
  );
}