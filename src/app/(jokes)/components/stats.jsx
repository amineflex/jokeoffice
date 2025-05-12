"use client"

import { useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import { Line, LineChart, XAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card2"
import { ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  count: {
    label: "Nombre de blagues",
    color: "#f97316",
  },
}

export default function CardsStats() {
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [uniqueUserCount, setUniqueUserCount] = useState(0)

  useEffect(() => {
    fetch("/api/stats/count")
      .then((res) => res.json())
      .then((data) => {
        setCounts(data.counts)
        setTotalCount(data.totalCount)
        setUniqueUserCount(data.uniqueUserCount)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="grid gap-2 p-2 rounded-xl border bg-card">
      {loading ? (
        <div className="p-4 rounded-xl border bg-card text-center">
          <div className="flex items-center justify-center gap-2">
            <LoaderCircle className="w-6 h-6 animate-spin" />
            <p className="text-sm text-foreground/75">Chargement des statistiques...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-4 xl:grid-cols-4">
          <>
          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-normal">Nombre de blagues</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="text-2xl font-bold">{totalCount} blagues</div>
              <ChartContainer config={chartConfig} className="h-[80px] w-full mb-5">
                <LineChart
                  data={counts}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="day"  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="count"
                    stroke="#f97316"
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-normal">Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueUserCount} comptes</div>
            </CardContent>
          </Card>
          </>
          </div>
      )}
    </div>
  )
}
