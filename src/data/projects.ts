
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
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7'
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
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
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
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
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
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
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
    image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b'
  },
  {
    id: 6,
    title: 'AI Image Generator',
    description: 'A web application that creates unique images using state-of-the-art AI models',
    skills: [
      { name: 'React', color: 'blue' },
      { name: 'TensorFlow.js', color: 'orange' },
      { name: 'WebGL', color: 'green' }
    ],
    codeSnippet: `async function generateImage(prompt) {
  setLoading(true);
  
  try {
    // Prepare model inputs
    const encodedPrompt = await textEncoder.encode(prompt);
    
    // Generate image latents
    const latents = await model.generateLatents(encodedPrompt);
    
    // Decode latents to image
    const image = await decoder.decode(latents);
    
    setGeneratedImage(image);
  } catch (error) {
    console.error('Generation failed:', error);
    setError('Failed to generate image. Please try again.');
  } finally {
    setLoading(false);
  }
}`,
    demoUrl: 'https://huggingface.co',
    repoUrl: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22'
  },
  {
    id: 7,
    title: 'Virtual Reality Tour',
    description: 'An immersive VR experience for exploring architectural spaces and landscapes',
    skills: [
      { name: 'Three.js', color: 'blue' },
      { name: 'WebXR', color: 'purple' },
      { name: 'GLSL', color: 'pink' }
    ],
    codeSnippet: `function initVRExperience() {
  // Set up Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  
  // Enable VR
  document.body.appendChild(VRButton.createButton(renderer));
  renderer.xr.enabled = true;
  
  // Add environment and interaction objects
  const environment = new Environment(scene);
  environment.load('models/tour_environment.glb');
  
  // Set up teleportation controls
  const teleport = new TeleportationControls(camera, scene, renderer);
  teleport.enable();
  
  // Animation loop
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}`,
    demoUrl: 'https://sketchfab.com',
    repoUrl: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b'
  },
  {
    id: 8,
    title: 'Real-time Collaboration Tool',
    description: 'A collaborative workspace allowing multiple users to edit documents simultaneously',
    skills: [
      { name: 'Socket.io', color: 'purple' },
      { name: 'CRDT', color: 'blue' },
      { name: 'Express', color: 'green' }
    ],
    codeSnippet: `function setupCollaborationSocket(documentId) {
  // Connect to collaboration server
  const socket = io(COLLABORATION_SERVER);
  
  // Initialize CRDT structure
  const crdt = new CRDT.Text(clientId);
  
  // Join document room
  socket.emit('join-document', { documentId, clientId });
  
  // Handle incoming operations
  socket.on('operation', operation => {
    // Apply remote operation to local state
    crdt.applyOperation(operation);
    
    // Update editor content without triggering local change events
    updateEditorSilently(crdt.toString());
  });
  
  // Send local changes to server
  editor.on('change', (change) => {
    const operations = crdt.handleLocalChange(change);
    socket.emit('operation', { documentId, operations, clientId });
  });
}`,
    demoUrl: 'https://www.figma.com',
    repoUrl: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  },
  {
    id: 9,
    title: 'Neural Network Visualizer',
    description: 'An interactive tool for visualizing and understanding neural network architectures',
    skills: [
      { name: 'D3.js', color: 'orange' },
      { name: 'React', color: 'blue' },
      { name: 'Python', color: 'green' }
    ],
    codeSnippet: `function renderNeuralNetwork(container, network) {
  // Calculate layout dimensions
  const width = container.clientWidth;
  const height = 500;
  const layerGap = width / (network.layers.length + 1);
  
  // Create SVG container
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Render layers
  network.layers.forEach((layer, layerIndex) => {
    const x = layerGap * (layerIndex + 1);
    const nodeGap = height / (layer.neurons.length + 1);
    
    // Render neurons in this layer
    layer.neurons.forEach((neuron, neuronIndex) => {
      const y = nodeGap * (neuronIndex + 1);
      
      // Draw neuron
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 10)
        .attr('fill', neuron.activation > 0.5 ? '#f87171' : '#60a5fa')
        .attr('stroke', '#000')
        .attr('stroke-width', 1);
        
      // Draw connections to previous layer if not first layer
      if (layerIndex > 0) {
        const prevLayer = network.layers[layerIndex - 1];
        const prevX = layerGap * layerIndex;
        
        prevLayer.neurons.forEach((prevNeuron, prevIndex) => {
          const prevY = height / (prevLayer.neurons.length + 1) * (prevIndex + 1);
          const weight = neuron.weights[prevIndex];
          
          // Draw connection with color and thickness based on weight
          svg.append('line')
            .attr('x1', prevX)
            .attr('y1', prevY)
            .attr('x2', x)
            .attr('y2', y)
            .attr('stroke', weight > 0 ? '#22c55e' : '#ef4444')
            .attr('stroke-width', Math.abs(weight) * 3)
            .attr('stroke-opacity', 0.6);
        });
      }
    });
  });
}`,
    demoUrl: 'https://playground.tensorflow.org/',
    repoUrl: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31'
  },
  {
    id: 10,
    title: 'Augmented Reality Game',
    description: 'A mobile AR game that blends virtual elements with the real world',
    skills: [
      { name: 'Unity', color: 'blue' },
      { name: 'ARKit', color: 'green' },
      { name: 'C#', color: 'purple' }
    ],
    codeSnippet: `public class ARGameController : MonoBehaviour
{
    [SerializeField] private Camera arCamera;
    [SerializeField] private GameObject enemyPrefab;
    [SerializeField] private float spawnRadius = 5f;
    [SerializeField] private int maxEnemies = 10;
    
    private List<GameObject> activeEnemies = new List<GameObject>();
    private ARRaycastManager raycastManager;
    
    void Start()
    {
        raycastManager = GetComponent<ARRaycastManager>();
        StartCoroutine(SpawnEnemies());
    }
    
    IEnumerator SpawnEnemies()
    {
        while (true)
        {
            if (activeEnemies.Count < maxEnemies)
            {
                // Find a valid spawn position on a detected plane
                Vector2 screenCenter = new Vector2(Screen.width / 2, Screen.height / 2);
                List<ARRaycastHit> hits = new List<ARRaycastHit>();
                
                if (raycastManager.Raycast(screenCenter, hits, TrackableType.PlaneWithinPolygon))
                {
                    // Get spawn position offset from camera
                    Vector3 spawnPosition = hits[0].pose.position;
                    Vector3 randomOffset = Random.insideUnitSphere * spawnRadius;
                    randomOffset.y = 0; // Keep on ground plane
                    
                    // Spawn enemy
                    GameObject enemy = Instantiate(enemyPrefab, spawnPosition + randomOffset, Quaternion.identity);
                    activeEnemies.Add(enemy);
                }
            }
            
            // Wait before next spawn attempt
            yield return new WaitForSeconds(3f);
        }
    }
}`,
    demoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    repoUrl: 'https://github.com',
    image: 'https://images.unsplash.com/photo-1563302111-eab4ab3f50e7'
  }
];
