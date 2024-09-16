import "./Testimonial.css"

const Testimonial = () => {


    const testimonials = [
        {
            id: 1,
            quote: "This service is fantastic! It has changed the way I work.",
            name: "John Doe",
            position: "CEO, Example Corp",
        },
        {
            id: 2,
            quote: "I highly recommend this to anyone looking for a reliable solution.",
            name: "Jane Smith",
            position: "Marketing Manager, Another Co",
        },
        {
            id: 3,
            quote: "An excellent experience from start to finish great job.",
            name: "Emily Johnson",
            position: "Product Lead, MyCompany",
        }
    ];

    return (
        <section className="testimonial-section">
            <h2>What Our Clients Say</h2>
            <div className="testimonials">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial">
                        <blockquote>
                            <p>{'"'}{testimonial.quote} {'"'}</p>
                        </blockquote>
                        <div className="testimonial-author">
                            <p className="name">{testimonial.name}</p>
                            <p className="position">{testimonial.position}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimonial