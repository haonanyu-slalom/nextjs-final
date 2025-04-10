import Form from "@/app/ui/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Profile Form
        </h1>

        {/* Add form component here */}
        <Form id={id}></Form>
      </div>
    </div>
  );
}
