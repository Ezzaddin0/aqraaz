import { CardContent, Card, CardTitle, CardDescription, CardHeader, CardFooter } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link";
import { getCategories } from "../../data/dataApi";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";

const soicelMedia = [
  {
    title: "Twitter",
    icon: <TwitterIcon className="w-8 h-8" />,
    link: "https://twitter.com/aqraazbh",
    color: "#1DA1F2"
  },
  {
    title: "Instagram",
    icon: <InstagramIcon className="w-8 h-8" />,
    link: "https://www.instagram.com/aqrraz/",
    color: "#E1306C"
  },
  {
    title: "Youtube",
    icon: <YoutubeIcon className="w-8 h-8" />,
    link: "https://www.youtube.com/@Ezzaddin_",
    color: "#FF0000"
  },
  {
    title: "Facebook",
    icon: <FacebookIcon className="w-8 h-8" />,
    link: "https://www.facebook.com/profile.php?id=61555628315309",
    color: "#1877F2"
  }
]

export default async function CategoriesSection({ lang }) {
  const Categories = await getCategories({
    select: {
      id: true,
      slug: true,
      title: true,
    },
  });  
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
      <div className="space-y-4 flex flex-col justify-between h-full">
        <h3 className="text-2xl font-bold">{lang == "en" ? "Categories" : "الاقسام"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {Categories.slice(0, 6).map((category, index) => {
            return (
            <Link href={`${lang}/categories/${category.slug}?cat=${category.slug}`} className="text-3xl font-semibold">
              <Card key={index} className="h-full">
                <CardContent className="flex items-center justify-center p-6 h-full">
                  {lang == 'en' ? category.title.en : category.title.ar}
                </CardContent>
              </Card>
            </Link>
            )
          })}
        </div>
      </div>

      <div className="space-y-4 flex flex-col justify-between h-full">
        <h3 className="text-2xl font-bold">{lang == "en" ? "Social Media" : "تواصل الاجتماعي"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soicelMedia.map((soicel, index) => (
            <Link aria-label={soicel.title} href={soicel.link}> 
              <Card key={`${soicel.title}-${index}`}>
                <CardContent className={`flex items-center rounded text-[${soicel.color}] hover:bg-[${soicel.color}] hover:text-white justify-center p-6`}>
                    {soicel.icon}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{lang == "en" ? "Subscribe to our blog" : "اشترك في مدونتنا"}</CardTitle>
            <CardDescription>{lang == "en" ? "Get the latest articles delivered straight to your inbox." : "احصل على أحدث المقالات التي يتم إرسالها إلى بريدك الإلكتروني."}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">{lang == "en" ? "Email address" : "عنوان البريد الإلكتروني"}</Label>
              <Input id="email" placeholder="m@example.com" type="email" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              {lang == "en" ? "Subscribe" : "أشتراك"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}