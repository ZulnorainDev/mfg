import { useEffect, useState } from "react"
import { Info, Edit, Trash2, Plus, Save, X, Users, DollarSign, Building } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Textarea } from "../../components/ui/Textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { Badge } from "../../components/ui/Badge"
import { useAppData } from "../../hooks/UseAppData"
// import { toast } from "@/hooks/use-toast"
// import Nav from "@/components/nav"
// import AuthGuard from "@/components/auth-guard"

const API_BASE_URL = "http://127.0.0.1:7777/api"

// Dummy data matching the API schema
const DUMMY_DATA = {
  id: 1,
  about_company: {
    overview:
      "MediCare is a leading healthcare technology company dedicated to improving patient care through innovative digital solutions.",
    our_mission:
      "To revolutionize healthcare delivery by providing accessible, efficient, and patient-centered medical services.",
    our_commitment:
      "We are committed to maintaining the highest standards of medical care while embracing cutting-edge technology to serve our patients better.",
    our_vission:
      "To become the most trusted healthcare platform, connecting patients with quality medical care anytime, anywhere.",
    about_ceo:
      "Dr. Sarah Johnson, MD, MBA - With over 15 years of experience in healthcare administration and digital health innovation, Dr. Johnson leads MediCare with a vision of transforming patient care through technology.",
  },
  about_team: {
    team_intro:
      "Our diverse team of healthcare professionals, technologists, and innovators work together to deliver exceptional medical services.",
    team_members: [
      {
        team_member_name: "Dr. Michael Chen",
        team_member_position: "Chief Medical Officer",
        team_member_bio:
          "Board-certified physician with 20+ years of clinical experience and expertise in telemedicine.",
        team_member_page_url: "/team/michael-chen",
        team_member_location: "San Francisco, CA",
      },
      {
        team_member_name: "Emily Rodriguez",
        team_member_position: "Head of Technology",
        team_member_bio:
          "Former Silicon Valley engineer specializing in healthcare IT systems and patient data security.",
        team_member_page_url: "/team/emily-rodriguez",
        team_member_location: "Austin, TX",
      },
    ],
  },
  pricing: {
    intro:
      "Choose the plan that best fits your healthcare needs. All plans include 24/7 support and secure patient data management.",
    packages: [
      {
        title: "Basic Care",
        price: "$29/month",
        includes: ["Virtual consultations", "Prescription management", "Basic health monitoring", "Email support"],
      },
      {
        title: "Premium Care",
        price: "$59/month",
        includes: [
          "Everything in Basic",
          "Priority scheduling",
          "Specialist referrals",
          "Phone support",
          "Health analytics",
        ],
      },
      {
        title: "Family Plan",
        price: "$99/month",
        includes: [
          "Everything in Premium",
          "Up to 4 family members",
          "Family health dashboard",
          "Dedicated care coordinator",
        ],
      },
    ],
    note: "All plans include a 30-day free trial. Cancel anytime with no hidden fees.",
  },
}

export default function Page() {

  const {companyInfo1} = useAppData();

  const [companyInfo, setCompanyInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [activeTab, setActiveTab] = useState("company")

  useEffect(() => {
    fetchCompanyInfo()
  }, [])

  async function fetchCompanyInfo() {
    try {
      setLoading(true)
      // Simulate API call - replace with actual API endpoint
      // const response = await fetch(`${API_BASE_URL}/get_company_info/`)
      // const data = await response.json()

      // For now, use dummy data
      setTimeout(() => {
        setCompanyInfo(DUMMY_DATA)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch company info:", error)
      setCompanyInfo(DUMMY_DATA)
      setLoading(false)
      // toast({ title: "Error", description: "Failed to load company information", variant: "destructive" })
    }
  }

  async function saveCompanyInfo(data) {
    try {
      setLoading(true)

      // Simulate API call - replace with actual API endpoint
      // const response = await fetch(`${API_BASE_URL}/about_and_company_info_insert_update/`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data)
      // })

      // For now, simulate success
      setTimeout(() => {
        setCompanyInfo(data)
        setEditMode(false)
        setEditData(null)
        setLoading(false)
        // toast({ title: "Success", description: "Company information updated successfully" })
      }, 1000)
    } catch (error) {
      console.error("Failed to save company info:", error)
      setLoading(false)
      // toast({ title: "Error", description: "Failed to save company information", variant: "destructive" })
    }
  }

  async function deleteCompanyInfo() {
    if (!confirm("Are you sure you want to delete all company information?")) return

    try {
      setLoading(true)

      // Simulate API call - replace with actual API endpoint
      // const response = await fetch(`${API_BASE_URL}/delete_company_info/${companyInfo.id}`, {
      //   method: 'DELETE'
      // })

      // For now, simulate success
      setTimeout(() => {
        setCompanyInfo(null)
        setLoading(false)
        // toast({ title: "Success", description: "Company information deleted successfully" })
      }, 1000)
    } catch (error) {
      console.error("Failed to delete company info:", error)
      setLoading(false)
      // toast({ title: "Error", description: "Failed to delete company information", variant: "destructive" })
    }
  }

  function startEdit() {
    setEditData(JSON.parse(JSON.stringify(companyInfo)))
    setEditMode(true)
  }

  function cancelEdit() {
    setEditMode(false)
    setEditData(null)
  }

  function handleSave() {
    if (editData) {
      saveCompanyInfo(editData)
    }
  }

  function updateEditData(path, value) {
    const newData = { ...editData }
    const keys = path.split(".")
    let current = newData

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = value
    setEditData(newData)
  }

  function addTeamMember() {
    const newMember = {
      team_member_name: "",
      team_member_position: "",
      team_member_bio: "",
      team_member_page_url: "",
      team_member_location: "",
    }

    const newData = { ...editData }
    newData.about_team.team_members.push(newMember)
    setEditData(newData)
  }

  function removeTeamMember(index) {
    const newData = { ...editData }
    newData.about_team.team_members.splice(index, 1)
    setEditData(newData)
  }

  function addPricingPackage() {
    const newPackage = {
      title: "",
      price: "",
      includes: [],
    }

    const newData = { ...editData }
    newData.pricing.packages.push(newPackage)
    setEditData(newData)
  }

  function removePricingPackage(index) {
    const newData = { ...editData }
    newData.pricing.packages.splice(index, 1)
    setEditData(newData)
  }

  function addPackageFeature(packageIndex, feature) {
    if (!feature.trim()) return

    const newData = { ...editData }
    newData.pricing.packages[packageIndex].includes.push(feature.trim())
    setEditData(newData)
  }

  function removePackageFeature(packageIndex, featureIndex) {
    const newData = { ...editData }
    newData.pricing.packages[packageIndex].includes.splice(featureIndex, 1)
    setEditData(newData)
  }

  if (loading) {
    return (
      <main className="min-h-svh bg-gradient-to-b from-white to-emerald-50">
        {/* <AuthGuard /> */}
        {/* <Nav /> */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading company information...</p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (!companyInfo) {
    return (
      <main className="min-h-svh bg-gradient-to-b from-white to-emerald-50">
        {/* <AuthGuard /> */}
        {/* <Nav /> */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-teal-600" />
              <h1 className="text-2xl font-semibold">About Company</h1>
            </div>
            <Button onClick={() => setEditData(DUMMY_DATA)} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" /> Create Company Info
            </Button>
          </div>
          <div className="text-center py-12">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No company information found</p>
          </div>
        </section>
      </main>
    )
  }

  const currentData = editMode ? editData : companyInfo1

  return (
    <main className="min-h-svh bg-gradient-to-b from-white to-emerald-50">
      {/* <AuthGuard /> */}
      {/* <Nav /> */}

      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Info className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-semibold">About Company</h1>
          </div>
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button variant="outline" onClick={cancelEdit}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={startEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" onClick={deleteCompanyInfo}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="overview">Overview</Label>
                  {editMode ? (
                    <Textarea
                      id="overview"
                      value={currentData.about_company.overview}
                      onChange={(e) => updateEditData("about_company.overview", e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">overview data</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mission">Our Mission</Label>
                  {editMode ? (
                    <Textarea
                      id="mission"
                      value={currentData.about_company.our_mission}
                      onChange={(e) => updateEditData("about_company.our_mission", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{currentData.about_company.our_mission}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commitment">Our Commitment</Label>
                  {editMode ? (
                    <Textarea
                      id="commitment"
                      value={currentData.about_company.our_commitment}
                      onChange={(e) => updateEditData("about_company.our_commitment", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{currentData.about_company.our_commitment}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision">Our Vision</Label>
                  {editMode ? (
                    <Textarea
                      id="vision"
                      value={currentData.about_company.our_vission}
                      onChange={(e) => updateEditData("about_company.our_vission", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{currentData.about_company.our_vission}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ceo">About CEO</Label>
                  {editMode ? (
                    <Textarea
                      id="ceo"
                      value={currentData.about_company.about_ceo}
                      onChange={(e) => updateEditData("about_company.about_ceo", e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{currentData.about_company.about_ceo}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="team-intro">Team Introduction</Label>
                  {editMode ? (
                    <Textarea
                      id="team-intro"
                      value={currentData.about_team.team_intro}
                      onChange={(e) => updateEditData("about_team.team_intro", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{currentData.about_team.team_intro}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Team Members</Label>
                    {editMode && (
                      <Button variant="outline" size="sm" onClick={addTeamMember}>
                        <Plus className="mr-2 h-4 w-4" /> Add Member
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {currentData.about_team.team_members.map((member, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="p-4">
                          {editMode ? (
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Member {index + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTeamMember(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Name"
                                value={member.team_member_name}
                                onChange={(e) =>
                                  updateEditData(`about_team.team_members.${index}.team_member_name`, e.target.value)
                                }
                              />
                              <Input
                                placeholder="Position"
                                value={member.team_member_position}
                                onChange={(e) =>
                                  updateEditData(
                                    `about_team.team_members.${index}.team_member_position`,
                                    e.target.value,
                                  )
                                }
                              />
                              <Textarea
                                placeholder="Bio"
                                value={member.team_member_bio}
                                onChange={(e) =>
                                  updateEditData(`about_team.team_members.${index}.team_member_bio`, e.target.value)
                                }
                                rows={2}
                              />
                              <Input
                                placeholder="Page URL"
                                value={member.team_member_page_url}
                                onChange={(e) =>
                                  updateEditData(
                                    `about_team.team_members.${index}.team_member_page_url`,
                                    e.target.value,
                                  )
                                }
                              />
                              <Input
                                placeholder="Location"
                                value={member.team_member_location}
                                onChange={(e) =>
                                  updateEditData(
                                    `about_team.team_members.${index}.team_member_location`,
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <h4 className="font-medium">{member.team_member_name}</h4>
                              <Badge variant="secondary">{member.team_member_position}</Badge>
                              <p className="text-sm text-muted-foreground">{member.team_member_bio}</p>
                              <div className="text-xs text-muted-foreground">
                                <p>Location: {member.team_member_location}</p>
                                {member.team_member_page_url && <p>Page: {member.team_member_page_url}</p>}
                              </div>
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

          <TabsContent value="pricing" className="space-y-6">
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pricing-intro">Pricing Introduction</Label>
                  {editMode ? (
                    <Textarea
                      id="pricing-intro"
                      value={currentData.pricing.intro}
                      onChange={(e) => updateEditData("pricing.intro", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{currentData.pricing.intro}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Pricing Packages</Label>
                    {editMode && (
                      <Button variant="outline" size="sm" onClick={addPricingPackage}>
                        <Plus className="mr-2 h-4 w-4" /> Add Package
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {currentData.pricing.packages.map((pkg, index) => (
                      <Card key={index} className="border-gray-200">
                        <CardContent className="p-4">
                          {editMode ? (
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Package {index + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removePricingPackage(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Title"
                                value={pkg.title}
                                onChange={(e) => updateEditData(`pricing.packages.${index}.title`, e.target.value)}
                              />
                              <Input
                                placeholder="Price"
                                value={pkg.price}
                                onChange={(e) => updateEditData(`pricing.packages.${index}.price`, e.target.value)}
                              />
                              <div className="space-y-2">
                                <Label className="text-xs">Features</Label>
                                {pkg.includes.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex gap-2">
                                    <Input value={feature} readOnly className="text-xs" />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removePackageFeature(index, featureIndex)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Add feature"
                                    className="text-xs"
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault()
                                        addPackageFeature(index, e.target.value)
                                        e.target.value = ""
                                      }
                                    }}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      const input = e.target.parentElement.querySelector("input")
                                      addPackageFeature(index, input.value)
                                      input.value = ""
                                    }}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="text-center">
                                <h4 className="font-medium text-lg">{pkg.title}</h4>
                                <p className="text-2xl font-bold text-teal-600">{pkg.price}</p>
                              </div>
                              <ul className="space-y-1">
                                {pkg.includes.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                                    <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                                    {feature}
                                  </li>
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
                  <Label htmlFor="pricing-note">Pricing Note</Label>
                  {editMode ? (
                    <Textarea
                      id="pricing-note"
                      value={currentData.pricing.note}
                      onChange={(e) => updateEditData("pricing.note", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{currentData.pricing.note}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
