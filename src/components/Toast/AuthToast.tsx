function AuthToast({ message }: { message: string }) {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert bg-red-500 border border-none shadow-none">
        <p className="text-white font-geist font-medium text-sm">{message}</p>
      </div>
    </div>
  );
}

export default AuthToast;
