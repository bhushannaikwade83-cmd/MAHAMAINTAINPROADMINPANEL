import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/pending-registrations')({
  component: PendingRegistrations,
})

interface Registration {
  id: number
  name: string
  phone: string
  email: string
  address: string
  society_name: string
  society_address: string
  pincode: string
  flat_number: string
  status: string
  created_at: string
}

function PendingRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [approving, setApproving] = useState<number | null>(null)

  useEffect(() => {
    fetchPendingRegistrations()
  }, [])

  const fetchPendingRegistrations = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://digitrixmedia.com/mahamaintainpro/api/get-pending-registrations.php')
      const data = await response.json()

      if (data.success) {
        setRegistrations(data.data)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (id: number, action: 'approved' | 'rejected') => {
    setApproving(id)
    try {
      const response = await fetch('https://digitrixmedia.com/mahamaintainpro/api/get-pending-registrations.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          individual_id: id,
          action: action,
          admin_notes: action === 'approved' ? 'Approved by admin' : 'Rejected by admin',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRegistrations(registrations.filter((reg) => reg.id !== id))
        alert(`Registration ${action} successfully!`)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to update registration')
    } finally {
      setApproving(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pending Registrations</h1>
        <p className="text-gray-600 mt-2">Review and approve new individual registrations</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">{error}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {registrations.length === 0 ? (
          <Card>
            <CardContent className="pt-12">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No Pending Registrations</h3>
                <p className="text-gray-600 mt-2">All registrations have been reviewed!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          registrations.map((reg) => (
            <Card key={reg.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{reg.name}</CardTitle>
                    <CardDescription>ID: {reg.id}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="society">Society Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{reg.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{reg.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{reg.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Applied On</p>
                      <p className="font-medium">{new Date(reg.created_at).toLocaleDateString()}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="society" className="space-y-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Society Name</p>
                      <p className="font-medium">{reg.society_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Society Address</p>
                      <p className="font-medium">{reg.society_address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Pincode</p>
                        <p className="font-medium">{reg.pincode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Flat/Unit</p>
                        <p className="font-medium">{reg.flat_number}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleApproval(reg.id, 'approved')}
                    disabled={approving === reg.id}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {approving === reg.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleApproval(reg.id, 'rejected')}
                    disabled={approving === reg.id}
                    variant="outline"
                    className="flex-1"
                  >
                    {approving === reg.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Rejecting...
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
