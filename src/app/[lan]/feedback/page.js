import Feedback from './feedback'
import { getDictionary } from '@/lib/content/i18n'

const Page = async ({ params }) => {
    const { lan } = await params
    const dictionary = await getDictionary(lan, 'feedback')

    return <Feedback content={dictionary.feedback} />
}

export default Page