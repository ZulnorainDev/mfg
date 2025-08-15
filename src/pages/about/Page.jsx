import { useEffect, useState } from "react";
import {
  Info,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Users,
  DollarSign,
  Building,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Textarea } from "../../components/ui/Textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs";
import { Badge } from "../../components/ui/Badge";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Page() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(state?.item || null);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [activeTab, setActiveTab] = useState("company");

  function deleteCompanyInfo() {
    if (!confirm("Are you sure you want to delete all company information?"))
      return;

    setItem(null);
  }

  function startEdit() {
    setEditData(JSON.parse(JSON.stringify(item)));
    setEditMode(true);
  }

  function cancelEdit() {
    setEditMode(false);
    setEditData(null);
  }

  async function handleSave() {
    if (!editData) return;

    try {
      // Get ID dynamically from the existing item
      const companyId = item?.id;

      const response = await fetch(
        `https://mfgprodbot.hellommj.com/api/about_and_company_info_insert_update/?id=${companyId}`,
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Save successful:", result);

      // Update local state after successful save
      setItem(editData);
      setEditMode(false);
      setEditData(null);
      alert("Company information saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save company information.");
    }
  }

  function updateEditData(path, value) {
    const newData = { ...editData };
    const keys = path.split(".");
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setEditData(newData);
  }

  function addTeamMember() {
    const newMember = {
      team_member_name: "",
      team_member_position: "",
      team_member_bio: "",
      team_member_page_url: "",
      team_member_location: "",
    };
    const newData = { ...editData };
    newData.about_team.team_members.push(newMember);
    setEditData(newData);
  }

  function removeTeamMember(index) {
    const newData = { ...editData };
    newData.about_team.team_members.splice(index, 1);
    setEditData(newData);
  }

  function addPricingPackage() {
    const newPackage = { title: "", price: "", includes: [] };
    const newData = { ...editData };
    newData.pricing.packages.push(newPackage);
    setEditData(newData);
  }

  function removePricingPackage(index) {
    const newData = { ...editData };
    newData.pricing.packages.splice(index, 1);
    setEditData(newData);
  }

  function addPackageFeature(packageIndex, feature) {
    if (!feature.trim()) return;
    const newData = { ...editData };
    newData.pricing.packages[packageIndex].includes.push(feature.trim());
    setEditData(newData);
  }

  function removePackageFeature(packageIndex, featureIndex) {
    const newData = { ...editData };
    newData.pricing.packages[packageIndex].includes.splice(featureIndex, 1);
    setEditData(newData);
  }

  if (!item) return <p>No company information available</p>;

  const dataToUse = editMode ? editData : item;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-[var(--1)]/20">
      <div className="px-8 pt-4 bg-gray-50">
        <Navbar/>
      </div>

      <section className="px-8 pb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Info className="h-6 w-6 text-[var(--1)]" />
            <h1 className="text-2xl font-semibold">About Company</h1>
          </div>

          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button variant="outline" onClick={cancelEdit} className="cursor-pointer ">
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="cursor-pointer bg-[var(-1)] hover:bg-[var(--11)] hover:text-white"
                >
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </>
            ) : (
              <>
                <button onClick={startEdit}
                 className="text-lg cursor-pointer flex items-center gap-4 pr-5 pl-4 py-1 rounded-md bg-[var(--1)] text-white">
                  <Edit className="h-4 w-4" /> Edit
                </button>
                {/* <Button variant="destructive" onClick={deleteCompanyInfo} className="cursor-pointer">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button> */}
              </>
            )}
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company" className="cursor-pointer w-full">
              <Building className="h-4" /> Company
            </TabsTrigger>
            <TabsTrigger value="team" className="cursor-pointer w-full">
              <Users className="h-4" /> Team
            </TabsTrigger>
            <TabsTrigger value="pricing" className="cursor-pointer w-full">
              <DollarSign className="h-4" /> Pricing
            </TabsTrigger>
          </TabsList>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="border-[var(--1)]">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  "overview",
                  "our_mission",
                  "our_commitment",
                  "our_vission",
                  "about_ceo",
                ].map((field, idx) => (
                  <div key={idx} className="space-y-2">
                    <Label>{field.replace(/_/g, " ")}</Label>
                    {editMode ? (
                      <Textarea
                        value={dataToUse.about_company[field]}
                        onChange={(e) =>
                          updateEditData(
                            `about_company.${field}`,
                            e.target.value
                          )
                        }
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {dataToUse.about_company[field]}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="border-[var(--1)]">
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Team Introduction</Label>
                  {editMode ? (
                    <Textarea
                      value={dataToUse.about_team.team_intro}
                      onChange={(e) =>
                        updateEditData("about_team.team_intro", e.target.value)
                      }
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {dataToUse.about_team.team_intro}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Team Members</Label>
                    {editMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addTeamMember}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Member
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {dataToUse.about_team.team_members.map((member, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="p-4">
                          {editMode ? (
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h4>Member {index + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTeamMember(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              {[
                                "team_member_name",
                                "team_member_position",
                                "team_member_page_url",
                                "team_member_location",
                              ].map((f) => (
                                <Input
                                  key={f}
                                  placeholder={f.replace(/_/g, " ")}
                                  value={member[f]}
                                  onChange={(e) =>
                                    updateEditData(
                                      `about_team.team_members.${index}.${f}`,
                                      e.target.value
                                    )
                                  }
                                />
                              ))}
                              <Textarea
                                placeholder="Bio"
                                value={member.team_member_bio}
                                onChange={(e) =>
                                  updateEditData(
                                    `about_team.team_members.${index}.team_member_bio`,
                                    e.target.value
                                  )
                                }
                                rows={2}
                              />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <h4>{member.team_member_name}</h4>
                              <Badge variant="secondary">
                                {member.team_member_position}
                              </Badge>
                              <p>{member.team_member_bio}</p>
                              <p>Location: {member.team_member_location}</p>
                              {member.team_member_page_url && (
                                <p>Page: {member.team_member_page_url}</p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card className="border-[var(--1)]">
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Pricing Introduction</Label>
                  {editMode ? (
                    <Textarea
                      value={dataToUse.pricing.intro}
                      onChange={(e) =>
                        updateEditData("pricing.intro", e.target.value)
                      }
                      rows={2}
                    />
                  ) : (
                    <p>{dataToUse.pricing.intro}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Pricing Packages</Label>
                    {editMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addPricingPackage}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Package
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {dataToUse.pricing.packages.map((pkg, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          {editMode ? (
                            <div className="space-y-3">
                              <Input
                                placeholder="Title"
                                value={pkg.title}
                                onChange={(e) =>
                                  updateEditData(
                                    `pricing.packages.${index}.title`,
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                placeholder="Price"
                                value={pkg.price}
                                onChange={(e) =>
                                  updateEditData(
                                    `pricing.packages.${index}.price`,
                                    e.target.value
                                  )
                                }
                              />
                              <div className="space-y-2">
                                <Label>Features</Label>
                                {pkg.includes.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex gap-2">
                                    <Input value={feature} readOnly />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        removePackageFeature(index, fIndex)
                                      }
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Add feature"
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        addPackageFeature(
                                          index,
                                          e.target.value
                                        );
                                        e.target.value = "";
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <h4>{pkg.title}</h4>
                              <p>{pkg.price}</p>
                              <ul>
                                {pkg.includes.map((feature, fIndex) => (
                                  <li key={fIndex}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pricing Note</Label>
                  {editMode ? (
                    <Textarea
                      value={dataToUse.pricing.note}
                      onChange={(e) =>
                        updateEditData("pricing.note", e.target.value)
                      }
                      rows={2}
                    />
                  ) : (
                    <p>{dataToUse.pricing.note}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
