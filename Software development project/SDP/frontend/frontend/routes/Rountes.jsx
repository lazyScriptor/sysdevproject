import React from 'react'

function Rountes() {
  return (
   <Routes>
              {/* Routes without Sidebar */}

              <Route path="/" element={<NewLogin />} />
              {/* Other routes with Sidebar */}
              <Route
                path="/customers"
                element={
                  <>
                    <Sidebar />
                    <Customers />
                  </>
                }
              />
              <Route
                path="/DashboardMain"
                element={
                  <>
                    <Sidebar />
                    <DashboardMain />
                  </>
                }
              />
              <Route
                path="/Equipment"
                element={
                  <>
                    <Sidebar />
                    <Equipment />
                  </>
                }
              />
              <Route
                path="/Inbox"
                element={
                  <>
                    <Sidebar />
                    <Inbox />
                  </>
                }
              />
              <Route
                path="/Invoice"
                element={
                  <>
                    <Sidebar />
                    <Invoice />
                  </>
                }
              />
              <Route
                path="/Reports"
                element={
                  <>
                    <Sidebar />
                    <Reports />
                  </>
                }
              />
              <Route
                path="/Reports-invoices"
                element={
                  <>
                    <Sidebar />
                    <ReportsBackgroundInvoices />
                  </>
                }
              />
              <Route
                path="/Reports-customers"
                element={
                  <>
                    <Sidebar />
                    <ReportsBackgroundEquipment />
                  </>
                }
              />

              <Route
                path="/Settings"
                element={
                  <>
                    <Sidebar />
                    <Settings />
                  </>
                }
              />
              <Route
                path="/userManagement"
                element={
                  <>
                    <Sidebar />
                    <UserManagement />
                  </>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<Notfoundd />} />
            </Routes>
  )
}

export default Rountes
