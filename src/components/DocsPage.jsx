import TenixDocs from "./TenixDocs";
import TenixDocsHeader from "./TenixDocsHeader";

export default function DocsPage() {
  return (
    <>
      <TenixDocsHeader />
      <div className="pt-20">
        <TenixDocs />
      </div>
    </>
  );
}
