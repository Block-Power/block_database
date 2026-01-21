import Link from "next/link"

export default function Page(){
    return (
        <main className="faq_main">
            <h1 className="faq_header">
                FAQ
            </h1>
            <section className="faq_body">
                <details open className="faq_detail">
                    <summary className="faq_question">
                        How do I find a block association?
                    </summary>
                    <p className="faq_answer">
                        Enter your address in the search box on the map, and after a second or less you should 
                        see some address options appear. Select yours and the map will re-center on it, then look 
                        for any markers nearby! Clicking on a marker will open a pop-up with some contact info for 
                        the block association.
                    </p>

                </details>
                <details open className="faq_detail">
                    <summary className="faq_question">
                        The information for a block association is wrong.
                    </summary>
                    <p className="faq_answer">
                        Sorry about that! Please submit updates on the <Link href="./contact">contact form</Link>, 
                        and we'll update it as soon as possible.
                    </p>

                </details>
                <details open className="faq_detail">
                    <summary className="faq_question">
                        What is Block Mapper?
                    </summary>
                    <p className="faq_answer">
                        Block Mapper is part of the Crown Heights Care Collective's Block Power project. 
                        Our goal is to build hyperlocal community institutions that empower us to take care 
                        of each other, without perpetuating systems of carceral violence. In order to do this, 
                        we built Block Mapper to help connect people to block associations and those block 
                        associations together.
                    </p>

                </details>

            </section>
            <section className="button_footer">
                <div className="button">
                    <Link href="./">
                        Back to the map
                    </Link>
                </div>
            </section>
        </main>
    )
}