import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages, getUserImages } from "@/lib/actions/image.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { string } from "zod"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  let demoName;
  let { userId } = auth();
  if (!userId) {
    demoName = 'Demo Edits';
    userId = 'user_2gKXD4isZQkumlx1UWZsQ2t8yTD';
  }
  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          editsName={demoName}
          page={page}
        />
      </section>
    </>
  )
}

export default Home