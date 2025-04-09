
export interface Project {
  id: number;
  title: string;
  description: string;
  skills: Array<{
    name: string;
    color: 'blue' | 'pink' | 'yellow' | 'orange' | 'green' | 'purple';
  }>;
  codeSnippet: string;
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Interactive Dashboard',
    description: 'A dynamic dashboard with real-time data visualization using React and D3.js',
    skills: [
      { name: 'React', color: 'blue' },
      { name: 'D3.js', color: 'orange' },
      { name: 'TypeScript', color: 'blue' }
    ],
    codeSnippet: `function DataViz() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data and update visualization
    fetchData().then(result => {
      setData(result);
    });
  }, []);
  
  return (
    <div className="chart-container">
      <BarChart data={data} />
    </div>
  );
}`,
    demoUrl: 'https://codepen.io',
    repoUrl: 'https://github.com',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'AI Chat Application',
    description: 'A conversational AI interface with natural language processing capabilities',
    skills: [
      { name: 'Python', color: 'green' },
      { name: 'TensorFlow', color: 'orange' },
      { name: 'Flask', color: 'blue' }
    ],
    codeSnippet: `def process_message(message):
    # Tokenize the input
    tokens = tokenizer.encode(message)
    
    # Generate response from model
    response = model.generate(
        input_ids=tokens,
        max_length=100,
        do_sample=True
    )
    
    return tokenizer.decode(response[0])`,
    demoUrl: 'https://codepen.io',
    repoUrl: 'https://github.com',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A full-featured online store with product listings, cart functionality, and payment processing',
    skills: [
      { name: 'Next.js', color: 'blue' },
      { name: 'Stripe', color: 'purple' },
      { name: 'Tailwind', color: 'blue' }
    ],
    codeSnippet: `export async function createCheckoutSession(items) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: \`\${process.env.HOST}/success\`,
    cancel_url: \`\${process.env.HOST}/cart\`,
  });

  return { id: session.id };
}`,
    demoUrl: 'https://codepen.io',
    repoUrl: 'https://github.com',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Mobile Fitness App',
    description: 'A cross-platform fitness tracking application with workout plans and progress monitoring',
    skills: [
      { name: 'React Native', color: 'blue' },
      { name: 'Firebase', color: 'yellow' },
      { name: 'Redux', color: 'purple' }
    ],
    codeSnippet: `class WorkoutTracker extends Component {
  startWorkout = () => {
    const { workoutId, dispatch } = this.props;
    
    // Initialize tracking
    this.interval = setInterval(() => {
      // Update duration
      dispatch(updateWorkoutDuration(workoutId));
    }, 1000);
    
    // Start tracking location
    navigator.geolocation.watchPosition(
      position => dispatch(updateLocation(position)),
      error => console.log(error),
      { enableHighAccuracy: true }
    );
  }
  
  // Additional component methods...
}`,
    demoUrl: 'https://codepen.io',
    repoUrl: 'https://github.com',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    title: 'Blockchain Explorer',
    description: 'A web interface for exploring blockchain transactions and wallet data',
    skills: [
      { name: 'Web3.js', color: 'green' },
      { name: 'Vue.js', color: 'green' },
      { name: 'Node.js', color: 'green' }
    ],
    codeSnippet: `async function getTransactionDetails(txHash) {
  if (!web3) {
    console.error('Web3 not initialized');
    return null;
  }
  
  try {
    // Get transaction details
    const tx = await web3.eth.getTransaction(txHash);
    
    // Get transaction receipt for status and gas used
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    
    return {
      ...tx,
      status: receipt.status,
      gasUsed: receipt.gasUsed,
      effectiveGasPrice: receipt.effectiveGasPrice
    };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return null;
  }
}`,
    demoUrl: 'https://codepen.io',
    repoUrl: 'https://github.com',
    image: '/placeholder.svg'
  }
];
