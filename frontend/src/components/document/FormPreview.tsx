import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FormPreview = () => {
  return (
    <Dialog>
      <DialogTrigger className="absolute right-10 bottom-10">
        <span></span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl mb-6">Deklaracja</DialogTitle>
          <DialogDescription>Tutaj będzie deklaracja</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FormPreview;
