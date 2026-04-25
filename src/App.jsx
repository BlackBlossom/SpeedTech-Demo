/**
 * App.jsx — demo showing Layout + both pages wired together.
 *
 * In your real project swap this for React Router:
 *
 *   <Route path="/members"    element={<Layout activeNav="members" breadcrumb={["Dashboard","Members"]}><MembersPage /></Layout>} />
 *   <Route path="/members/:id" element={<Layout activeNav="members" breadcrumb={["Dashboard","Members","Profile"]}><MemberDetailPage /></Layout>} />
 */

import { useState } from "react";
import Layout from "./components/Layout";
import MembersPage from "./pages/MembersPage";
import MemberDetailPage from "./pages/MemberDetailPage";

export default function App() {
  const [page, setPage] = useState("members");
  const [selectedMember, setSelectedMember] = useState(null);

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setPage("detail");
  };

  const handleBack = () => {
    setPage("members");
    setSelectedMember(null);
  };

  const breadcrumb =
    page === "detail"
      ? ["Dashboard", "Members", selectedMember?.company || "Profile"]
      : ["Dashboard", "Members"];

  return (
    <Layout
      activeNav="members"
      breadcrumb={breadcrumb}
    >
      {page === "members" ? (
        <MembersPage onViewMember={handleViewMember} />
      ) : (
        <MemberDetailPage onBack={handleBack} />
      )}
    </Layout>
  );
}