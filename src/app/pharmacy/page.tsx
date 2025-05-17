import NearbyPharmacies from "@/components/chat/NearbyPharmacies";

export default function PharmacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-primary">Nearby Medicine Shops</h1>
      <NearbyPharmacies />
    </div>
  );
}
