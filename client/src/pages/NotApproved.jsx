const NotApproved = () => (
  <div className="h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-2xl font-bold text-red-600 mb-4">Access Restricted</h1>
    <p className="text-lg text-gray-700">
      Your profile is pending admin approval. You will be notified once
      approved.
    </p>
  </div>
);

export default NotApproved;
