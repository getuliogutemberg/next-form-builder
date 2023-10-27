import { GetForms, GetFormsStats } from "@/actions/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import { LuView } from 'react-icons/lu'
import { FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { TbArrowBounce } from 'react-icons/tb'
import { Separator } from "@/components/ui/separator"
import CreateFormBtn from "@/components/CreateFormBtn"
import { Form } from "@prisma/client"


export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6"/>
        <h2 className="text-4xl font-bold col-span-2">Forms</h2>
      <Separator className="my-6"/>
      <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1,2,3,4].map((el)=>{
            return <FormCardSkeleton key={el} />
          })}
        >

          <FormCards />
        </Suspense>
      </div>
    </div>
  )
}

async function CardStatsWrapper() {
  const stats = await GetFormsStats()
  return (
    <StatsCards loading={false} data={stats} />
  )
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormsStats>>;
  loading: boolean;
}
function StatsCards(props: StatsCardProps) {
  const { data, loading } = props

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-col-4">
     <StatsCard 
     title="Total Visits" 
     icon={<LuView className='text-blue-600' />}
     helperText="Total number of visits" 
     value={data?.visits.toLocaleString()|| ''}
     loading={loading}
     className="shadow-md shadow-blue-600"
     />
     <StatsCard 
     title="Total Submissions" 
     icon={<FaWpforms className='text-yellow-600' />}
     helperText="Total number of submissions" 
     value={data?.visits.toLocaleString()|| ''}
     loading={loading}
     className="shadow-md shadow-yellow-600"
     />
     <StatsCard 
     title="Submission Rate" 
     icon={<HiCursorClick className='text-green-600' />}
     helperText="Visits that result in a submission" 
     value={data?.visits.toLocaleString() + '%'|| ''}
     loading={loading}
     className="shadow-md shadow-green-600"
     />
     <StatsCard 
     title="Submission Bounce Rate" 
     icon={<TbArrowBounce className='text-red-600' />}
     helperText="Visits that leave without submitting" 
     value={data?.visits.toLocaleString() + '%'|| ''}
     loading={loading}
     className="shadow-md shadow-red-600"
     />
    </div>
  )
}

function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}:{
  title: string
  icon: React.ReactNode
  helperText: string
  value: string
  loading: boolean
  className: string
}) {
  return <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {
          loading && <Skeleton>
            <span className="opacity-0">0</span>
          </Skeleton>
        }
        {!loading && value}

      </div>
      <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
    </CardContent>
  </Card>
}

function FormCardSkeleton() {
  return <Skeleton className="border- border-primary-/20 h-[190px] w-full" />
}

async function FormCards(){
 const forms= await GetForms()
 return <>
 {forms.map((form)=>{
   return <FormCard key={form.id} form={form} />
 })}
 </>
}

function FormCard({ form }:{ form:Form }) {
  return <Card>
    <CardHeader>
      <CardTitle>
        <span className="flex items-center gap-2 justify-between">{form.name}</span>
      </CardTitle>
    </CardHeader>
  </Card>
}