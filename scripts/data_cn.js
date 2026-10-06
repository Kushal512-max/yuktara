// scripts/data_cn.js
// 20 MCQs per unit for Computer Networks (Units 1 to 6)

module.exports = {
  "cn-u1-intro-phy-dll": [
    {
      q: "Which layer of the OSI model is responsible for node-to-node framing, physical MAC addressing, and error detection?",
      options: ["Network Layer", "Data Link Layer", "Physical Layer", "Transport Layer"],
      answer: 1,
      explanation: "The Data Link Layer packages bit streams into frames, handles hardware MAC addressing, and validates integrity.",
      difficulty: "Beginner"
    },
    {
      q: "In an n-node full mesh network topology, how many full-duplex physical links are required?",
      options: ["n - 1", "n * (n - 1) / 2", "2n", "n^2"],
      answer: 1,
      explanation: "Every node connects directly to every other node: n(n - 1) / 2 bidirectional links.",
      difficulty: "Beginner"
    },
    {
      q: "In HDLC bit stuffing, what bit is automatically inserted after encountering five consecutive '1' bits?",
      options: ["Bit '1'", "Bit '0'", "Parity bit", "CRC byte"],
      answer: 1,
      explanation: "Bit stuffing inserts a '0' after five consecutive 1s to prevent premature recognition of the flag pattern 01111110.",
      difficulty: "Intermediate"
    },
    {
      q: "In the Selective Repeat ARQ protocol, if the sequence number field is m bits, what is the maximum sender and receiver window size?",
      options: ["2^m", "2^(m - 1)", "2^m - 1", "2 * m"],
      answer: 1,
      explanation: "To avoid sequence ambiguity between old and new packets, window size must not exceed 2^(m - 1).",
      difficulty: "Intermediate"
    },
    {
      q: "Which collision handling protocol is used in legacy half-duplex Ethernet (IEEE 802.3)?",
      options: ["CSMA/CA", "CSMA/CD", "Pure ALOHA", "Token Ring"],
      answer: 1,
      explanation: "Ethernet uses Carrier Sense Multiple Access with Collision Detection (CSMA/CD).",
      difficulty: "Beginner"
    },
    {
      q: "What is the maximum theoretical channel efficiency (throughput) of Pure ALOHA?",
      options: ["18.4% (1 / 2e)", "36.8% (1 / e)", "50%", "100%"],
      answer: 0,
      explanation: "Pure ALOHA's vulnerable time is 2 * T_frame, resulting in maximum throughput of G * e^(-2G) = 1/(2e) ≈ 18.4%.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the maximum throughput of Slotted ALOHA?",
      options: ["18.4%", "36.8% (1 / e)", "73.6%", "50%"],
      answer: 1,
      explanation: "Restricting transmissions to discrete time slots halves vulnerable time to T_frame, achieving 1/e ≈ 36.8%.",
      difficulty: "Intermediate"
    },
    {
      q: "What mathematical technique does Cyclic Redundancy Check (CRC) use to detect transmission errors?",
      options: ["Bitwise XOR polynomial division in GF(2)", "Simple column parity addition", "MD5 hashing", "Two's complement addition"],
      answer: 0,
      explanation: "CRC uses modulo-2 binary division where the frame is divided by a predetermined generator polynomial.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the standard length of an Ethernet MAC address?",
      options: ["32 bits (4 bytes)", "48 bits (6 bytes)", "64 bits (8 bytes)", "128 bits (16 bytes)"],
      answer: 1,
      explanation: "A MAC address is a 48-bit (6-octet) globally unique physical hardware address burned into the NIC.",
      difficulty: "Beginner"
    },
    {
      q: "Which device operates primarily at Layer 2 (Data Link Layer) to forward frames based on MAC addresses?",
      options: ["Hub", "Switch", "Router", "Gateway"],
      answer: 1,
      explanation: "Layer 2 switches maintain MAC lookup tables to direct incoming frames specifically to destination ports.",
      difficulty: "Beginner"
    },
    {
      q: "What is the primary role of the Physical Layer in the OSI reference model?",
      options: ["Routing packets across internetworks", "Transmission of raw, unstructured bit streams over physical media", "Managing user sessions", "Encrypting application payloads"],
      answer: 1,
      explanation: "The physical layer defines mechanical, electrical, and functional specs for transmitting bits over cables or radio waves.",
      difficulty: "Beginner"
    },
    {
      q: "Why is CSMA/CA (Collision Avoidance) used in wireless networks (Wi-Fi 802.11) instead of CSMA/CD?",
      options: ["Wireless transceivers cannot reliably detect collisions while transmitting due to signal attenuation (hidden terminal problem)", "CSMA/CA is faster than CSMA/CD", "Wi-Fi does not use radio frequencies", "Cables prevent collisions"],
      answer: 0,
      explanation: "Transmitting overpowering signals masks incoming collisions in radio transceivers, requiring collision avoidance (RTS/CTS).",
      difficulty: "Intermediate"
    },
    {
      q: "In the Go-Back-N ARQ protocol with an m-bit sequence number, what is the maximum sender window size?",
      options: ["2^m", "2^m - 1", "2^(m - 1)", "m"],
      answer: 1,
      explanation: "Go-Back-N sender window size cannot exceed 2^m - 1 because the receiver window is strictly 1.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the round-trip propagation time relationship required for CSMA/CD to reliably detect collisions?",
      options: ["Frame transmission time T_fr >= 2 * Propagation delay T_prop", "T_fr < T_prop", "T_prop = 0", "T_fr must be infinite"],
      answer: 0,
      explanation: "A station must still be transmitting when a collision signal returns from the farthest end (T_fr >= 2 * T_prop).",
      difficulty: "Advanced"
    },
    {
      q: "Which transmission media offers the highest data transmission bandwidth and immunity to electromagnetic interference (EMI)?",
      options: ["Unshielded Twisted Pair (UTP)", "Shielded Twisted Pair (STP)", "Coaxial Cable", "Fiber Optic Cable"],
      answer: 3,
      explanation: "Fiber optic cables carry light pulses through glass cores, immune to electromagnetic noise and capable of massive bandwidth.",
      difficulty: "Beginner"
    },
    {
      q: "In Manchester encoding used in 10Mbps Ethernet, how is a binary bit represented?",
      options: ["By high and low voltage levels without transitions", "By a mid-bit transition (voltage step up or step down)", "By changing frequencies", "By turning off current"],
      answer: 1,
      explanation: "Manchester guarantees a signal transition at the center of each bit interval, enabling self-synchronization.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the PDU (Protocol Data Unit) called at the Data Link Layer?",
      options: ["Packet", "Segment", "Frame", "Bit"],
      answer: 2,
      explanation: "Data units are named: Physical=Bit, Data Link=Frame, Network=Packet, Transport=Segment.",
      difficulty: "Beginner"
    },
    {
      q: "What is the function of the Spanning Tree Protocol (IEEE 802.1D) in switched networks?",
      options: ["To balance web server loads", "To prevent bridge loops and broadcast radiation storms in redundant Layer 2 topologies", "To encrypt passwords", "To assign IP addresses"],
      answer: 1,
      explanation: "STP blocks redundant paths logically to create an acyclic spanning tree while preserving failover paths.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the purpose of the 8-byte Preamble and SFD in an Ethernet frame?",
      options: ["To store destination MAC address", "To allow receiver hardware clock synchronization with the incoming signal", "To compute CRC", "To specify payload length"],
      answer: 1,
      explanation: "The 10101010 alternating bit pattern synchronizes receiver clock circuitry before frame bytes arrive.",
      difficulty: "Intermediate"
    },
    {
      q: "Which multiplexing technique divides the frequency spectrum into distinct non-overlapping frequency bands assigned to different users?",
      options: ["Time Division Multiplexing (TDM)", "Frequency Division Multiplexing (FDM)", "Code Division Multiple Access (CDMA)", "Statistical TDM"],
      answer: 1,
      explanation: "FDM allocates separate sub-frequency bands simultaneously to distinct signal channels.",
      difficulty: "Beginner"
    }
  ],
  "cn-u2-network-layer": [
    {
      q: "How many total bits are used in an IPv6 address compared to an IPv4 address?",
      options: ["IPv4: 32 bits, IPv6: 64 bits", "IPv4: 32 bits, IPv6: 128 bits", "IPv4: 48 bits, IPv6: 128 bits", "IPv4: 64 bits, IPv6: 256 bits"],
      answer: 1,
      explanation: "IPv4 uses 32-bit addresses (~4.3 billion); IPv6 expands this to 128 bits (3.4 × 10^38 addresses).",
      difficulty: "Beginner"
    },
    {
      q: "What is the usable host capacity of a subnet with CIDR prefix /26?",
      options: ["64", "62", "30", "126"],
      answer: 1,
      explanation: "Host bits = 32 - 26 = 6 bits. Usable hosts = 2^6 - 2 (subtracting network and broadcast addresses) = 62.",
      difficulty: "Intermediate"
    },
    {
      q: "Which protocol translates an IP address into its corresponding physical MAC address on a local area network?",
      options: ["DNS", "ARP (Address Resolution Protocol)", "DHCP", "ICMP"],
      answer: 1,
      explanation: "ARP broadcasts a request to discover the hardware MAC address associated with a target IP address.",
      difficulty: "Beginner"
    },
    {
      q: "What issue causes the 'Count-to-Infinity' problem in Distance Vector Routing?",
      options: ["Packets exceeding TTL", "Routing loops caused by slow convergence when an edge link fails", "Flooding link states", "Exhaustion of RAM"],
      answer: 1,
      explanation: "Distance Vector algorithms (Bellman-Ford) propagate link breakages slowly, causing nodes to increment metrics towards infinity.",
      difficulty: "Intermediate"
    },
    {
      q: "Which routing protocol uses the Link State algorithm (Dijkstra's shortest path) within an Autonomous System?",
      options: ["RIP (Routing Information Protocol)", "OSPF (Open Shortest Path First)", "BGP (Border Gateway Protocol)", "EGP"],
      answer: 1,
      explanation: "OSPF floods Link State Advertisements (LSAs) and builds complete topology graphs using Dijkstra's algorithm.",
      difficulty: "Beginner"
    },
    {
      q: "Which routing protocol serves as the de facto inter-domain path-vector routing protocol running the global Internet backbone?",
      options: ["RIP", "OSPF", "BGP-4 (Border Gateway Protocol)", "IS-IS"],
      answer: 2,
      explanation: "BGP connects autonomous systems globally using path-vector policies across internet backbones.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the primary role of the Time to Live (TTL) field in an IPv4 packet header?",
      options: ["To measure network latency", "To prevent unroutable packets from circulating endlessly in routing loops", "To schedule packet delivery time", "To reserve router bandwidth"],
      answer: 1,
      explanation: "Each router decrements TTL by 1; if TTL drops to 0, the packet is discarded and an ICMP message is sent.",
      difficulty: "Beginner"
    },
    {
      q: "Which protocol is utilized by network utilities like 'ping' and 'traceroute' to send diagnostic error messages?",
      options: ["TCP", "UDP", "ICMP (Internet Control Message Protocol)", "IGMP"],
      answer: 2,
      explanation: "ICMP generates network operational notices like Echo Request/Reply and Time Exceeded errors.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of Network Address Translation (NAT)?",
      options: ["Encrypting web pages", "Mapping private RFC 1918 internal IP addresses to one or more public IP addresses", "Compressing multimedia files", "Assigning domain names"],
      answer: 1,
      explanation: "NAT allows entire private local networks to share single public IPv4 addresses, mitigating IPv4 exhaustion.",
      difficulty: "Beginner"
    },
    {
      q: "Which IPv4 address class uses the default subnet mask 255.255.0.0?",
      options: ["Class A", "Class B", "Class C", "Class D"],
      answer: 1,
      explanation: "Class B networks allocate 16 bits for network ID and 16 bits for host ID (mask /16 or 255.255.0.0).",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of the Split Horizon rule in Distance Vector routing?",
      options: ["Splitting large packets", "Preventing a router from advertising a route back on the interface from which it was learned", "Splitting networks into subnets", "Dual-homed routing"],
      answer: 1,
      explanation: "Split Horizon stops 2-node routing loops by not sending route updates back out through the incoming port.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the loopback IPv4 address reserved for local machine testing?",
      options: ["0.0.0.0", "127.0.0.1", "192.168.1.1", "255.255.255.255"],
      answer: 1,
      explanation: "127.0.0.1 (part of 127.0.0.0/8) routes directly back to the local host's TCP/IP stack.",
      difficulty: "Beginner"
    },
    {
      q: "Which IPv4 field enables reassembling fragmented packets at the destination host?",
      options: ["Identification, Flags (DF, MF), and Fragment Offset", "TTL and Checksum", "Source and Destination IP", "TOS field"],
      answer: 0,
      explanation: "Fragmented packets share an Identification value and indicate relative ordering via 8-byte Fragment Offset blocks.",
      difficulty: "Intermediate"
    },
    {
      q: "What happens when an IPv4 packet exceeds the Maximum Transmission Unit (MTU) of an outbound link and the Don't Fragment (DF) flag is set to 1?",
      options: ["The router ignores DF and fragments the packet", "The router drops the packet and returns an ICMP 'Destination Unreachable - Fragmentation Needed' error", "The router compresses the payload", "The packet is stored in RAM"],
      answer: 1,
      explanation: "If DF=1 and size exceeds MTU, routers cannot fragment and must drop the packet, sending ICMP type 3 code 4.",
      difficulty: "Intermediate"
    },
    {
      q: "In IPv6, which extension header replaces IPv4's on-path intermediate router fragmentation?",
      options: ["Hop-by-Hop Header", "Fragment Header (performed only by the source host)", "Routing Header", "Destination Options Header"],
      answer: 1,
      explanation: "Routers never fragment IPv6 packets in transit; path MTU discovery requires the sending host to fragment.",
      difficulty: "Advanced"
    },
    {
      q: "What is the broadcast IPv4 address for the network 192.168.10.0/24?",
      options: ["192.168.10.0", "192.168.10.255", "192.168.10.1", "255.255.255.255"],
      answer: 1,
      explanation: "Setting all 8 host bits to 1 in 192.168.10.0/24 gives the broadcast address 192.168.10.255.",
      difficulty: "Beginner"
    },
    {
      q: "What is an Autonomous System (AS) in computer networking?",
      options: ["A robot that lays cables", "A connected collection of IP routing prefixes under the administrative control of a single organization", "A computer that operates without an OS", "A decentralized DNS server"],
      answer: 1,
      explanation: "An AS is a coherent routing domain (like an ISP or enterprise) managed under a unified routing policy.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the minimum header size of an IPv4 packet with no options?",
      options: ["16 bytes", "20 bytes", "32 bytes", "40 bytes"],
      answer: 1,
      explanation: "A standard IPv4 header contains 5 rows of 32-bit words, totaling 20 bytes (IHL = 5).",
      difficulty: "Beginner"
    },
    {
      q: "What is the fixed base header size of an IPv6 packet?",
      options: ["20 bytes", "32 bytes", "40 bytes", "64 bytes"],
      answer: 2,
      explanation: "IPv6 uses a streamlined, fixed 40-byte base header to accelerate router processing.",
      difficulty: "Beginner"
    },
    {
      q: "Which algorithm forms the mathematical foundation of Distance Vector Routing?",
      options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Kruskal's Algorithm", "Floyd-Warshall Algorithm"],
      answer: 1,
      explanation: "Distance Vector protocols compute routing tables iteratively using Bellman-Ford equation Dx(y) = min {c(x,v) + Dv(y)}.",
      difficulty: "Intermediate"
    }
  ],
  "cn-u3-transport-layer": [
    {
      q: "What flags are exchanged between client and server during the TCP 3-Way Handshake in correct sequence?",
      options: ["ACK -> SYN -> SYN-ACK", "SYN -> SYN-ACK -> ACK", "SYN -> ACK -> FIN", "DATA -> ACK -> CLOSE"],
      answer: 1,
      explanation: "Client sends SYN; Server replies with SYN-ACK; Client confirms with ACK to establish connection.",
      difficulty: "Beginner"
    },
    {
      q: "What is the primary difference in delivery guarantee between TCP and UDP?",
      options: ["TCP is connection-oriented, reliable, and guarantees in-order delivery; UDP is connectionless and best-effort", "UDP provides error correction; TCP does not", "TCP is faster than UDP", "UDP uses 3-way handshakes"],
      answer: 0,
      explanation: "TCP uses sequence numbers and ACKs for reliable streams; UDP sends datagrams without connection setup or guarantees.",
      difficulty: "Beginner"
    },
    {
      q: "In TCP Congestion Control, how does the Congestion Window (cwnd) grow during the Slow Start phase?",
      options: ["Linearly by 1 MSS per RTT", "Exponentially (doubling every RTT upon receiving ACKs)", "It remains constant", "Decreases by half"],
      answer: 1,
      explanation: "During Slow Start, cwnd increases by 1 MSS for every received ACK, doubling cwnd every round-trip time.",
      difficulty: "Intermediate"
    },
    {
      q: "How does TCP achieve Flow Control to avoid overwhelming a slow receiver?",
      options: ["By dropping excess packets at the router", "The receiver advertises its available buffer space in the Receive Window (rwnd) field of TCP headers", "By doubling transmission speed", "By sending ICMP pauses"],
      answer: 1,
      explanation: "Sliding window flow control restricts sender in-flight bytes to <= receiver's advertised receive window (rwnd).",
      difficulty: "Intermediate"
    },
    {
      q: "What event triggers TCP Fast Retransmit without waiting for the retransmission timeout (RTO) to expire?",
      options: ["Receiving 1 ACK", "Receiving 3 duplicate ACKs for the same sequence number", "A network ping failure", "Server reboot"],
      answer: 1,
      explanation: "Three duplicate ACKs indicate a missing segment arrived out of order, prompting immediate retransmission.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the standard header size of a User Datagram Protocol (UDP) packet?",
      options: ["8 bytes", "20 bytes", "12 bytes", "40 bytes"],
      answer: 0,
      explanation: "UDP headers consist of four 2-byte fields (Source Port, Destination Port, Length, Checksum), totaling 8 bytes.",
      difficulty: "Beginner"
    },
    {
      q: "What is the default minimum header size of a TCP segment without optional fields?",
      options: ["8 bytes", "16 bytes", "20 bytes", "32 bytes"],
      answer: 2,
      explanation: "Standard TCP headers without options span 20 bytes (Data Offset = 5).",
      difficulty: "Beginner"
    },
    {
      q: "In Berkeley Socket programming, what is the correct sequence of system calls for a TCP server?",
      options: ["socket() -> bind() -> listen() -> accept()", "socket() -> connect() -> read() -> write()", "bind() -> socket() -> listen() -> accept()", "socket() -> accept() -> listen() -> bind()"],
      answer: 0,
      explanation: "A TCP server creates a socket, binds it to an IP/port, puts it in listen mode, and blocks on accept() for connections.",
      difficulty: "Intermediate"
    },
    {
      q: "Which socket system call is executed by a TCP client to initiate connection with a listening server?",
      options: ["bind()", "connect()", "listen()", "accept()"],
      answer: 1,
      explanation: "The client calls connect() to initiate the TCP 3-way handshake with the server's listening socket.",
      difficulty: "Beginner"
    },
    {
      q: "Why does TCP enter the TIME_WAIT state during 4-way connection termination?",
      options: ["To save electricity", "To allow late duplicate segments from the connection to expire in the network and ensure the final ACK was received", "To download file updates", "To reset firewall tables"],
      answer: 1,
      explanation: "TIME_WAIT (lasting 2 * MSL) prevents delayed packets from confusing subsequent connections using identical ports.",
      difficulty: "Advanced"
    },
    {
      q: "Which port number is registered by default for DNS queries over UDP/TCP?",
      options: ["22", "53", "80", "443"],
      answer: 1,
      explanation: "Domain Name System (DNS) services resolve queries on standard port 53.",
      difficulty: "Beginner"
    },
    {
      q: "Which TCP congestion control phase begins when the Congestion Window (cwnd) reaches the Slow Start Threshold (ssthresh)?",
      options: ["Fast Recovery", "Congestion Avoidance (additive increase)", "Multiplicative Decrease", "Connection Termination"],
      answer: 1,
      explanation: "Above ssthresh, TCP switches from exponential growth to linear Congestion Avoidance (+1 MSS per RTT).",
      difficulty: "Intermediate"
    },
    {
      q: "What does the TCP RST (Reset) flag signify?",
      options: ["Immediate abort and rejection of a connection", "Resetting sequence numbers to zero", "Restarting operating system", "Enabling encryption"],
      answer: 0,
      explanation: "RST indicates an abnormal termination, sent when segments arrive for an unassigned port or invalid state.",
      difficulty: "Intermediate"
    },
    {
      q: "Which transport protocol is best suited for real-time multiplayer video gaming and voice calls (VoIP)?",
      options: ["TCP, because lost audio packets must be resent", "UDP, because minimal latency is preferred over retransmitting stale voice samples", "HTTP/1.0", "FTP"],
      answer: 1,
      explanation: "VoIP and gaming prioritize low latency; resending dropped audio packets seconds later is useless.",
      difficulty: "Beginner"
    },
    {
      q: "What is the ephemeral port range typically assigned dynamically by modern operating systems to client sockets?",
      options: ["0 to 1023", "1024 to 49151", "49152 to 65535", "Above 100,000"],
      answer: 2,
      explanation: "IANA reserves 49152 through 65535 as private or dynamic/ephemeral ports for outbound client connections.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the PSH (Push) flag in a TCP header request the receiving TCP stack to do?",
      options: ["Deliver buffered data immediately to the receiving application without waiting for buffers to fill", "Push the packet to disk", "Disconnect the socket", "Push data to next router"],
      answer: 0,
      explanation: "PSH instructs the receiver to push all queued data straight to the user application.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the purpose of the TCP Keep-Alive mechanism?",
      options: ["To prevent server hardware sleep mode", "To periodically probe an idle connection and detect if the remote peer has crashed or network died", "To speed up video streaming", "To re-run the 3-way handshake"],
      answer: 1,
      explanation: "Keep-alive probes send empty ACKs on idle sockets to verify connectivity and release orphaned sockets.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Silly Window Syndrome in TCP?",
      options: ["Opening too many browser tabs", "A problem where data is transmitted in tiny segments (e.g. 1 byte) because either sender generates or receiver consumes data slowly", "A bug in Windows sockets", "A buffer overflow attack"],
      answer: 1,
      explanation: "Transmitting tiny payloads generates massive header overhead; mitigated by Nagle's algorithm and Clark's solution.",
      difficulty: "Advanced"
    },
    {
      q: "How does Nagle's algorithm prevent Silly Window Syndrome on the sender side?",
      options: ["By refusing to send data until previous in-flight packets are ACKed or a full MSS of data is buffered", "By compressing payloads", "By switching to UDP", "By doubling window size"],
      answer: 0,
      explanation: "Nagle's algorithm delays sending small packets until pending ACKs arrive or an entire MSS is queued.",
      difficulty: "Advanced"
    },
    {
      q: "What is the range of well-known system ports reserved for privileged network services?",
      options: ["0 to 1023", "1024 to 2048", "1000 to 5000", "50000 to 60000"],
      answer: 0,
      explanation: "Ports 0 through 1023 are Well-Known Ports reserved for core services (HTTP 80, HTTPS 443, SSH 22).",
      difficulty: "Beginner"
    }
  ],
  "cn-u4-app-security": [
    {
      q: "What is the correct chronological sequence of messages in the DHCP client-server IP allocation process?",
      options: ["Discover -> Request -> Offer -> Ack", "Discover -> Offer -> Request -> Acknowledge (DORA)", "Request -> Discover -> Ack -> Offer", "Offer -> Request -> Discover -> Ack"],
      answer: 1,
      explanation: "The DHCP DORA process: DHCPDiscover -> DHCPOffer -> DHCPRequest -> DHCPAcknowledge.",
      difficulty: "Beginner"
    },
    {
      q: "In asymmetric public-key cryptography (e.g. RSA), which key is used to decrypt a message encrypted with the receiver's Public Key?",
      options: ["Sender's Public Key", "Sender's Private Key", "Receiver's Private Key", "A shared symmetric key"],
      answer: 2,
      explanation: "Data encrypted with a party's public key can only be decrypted by that party's corresponding private key.",
      difficulty: "Beginner"
    },
    {
      q: "What security property does a Digital Signature provide that simple symmetric encryption does not?",
      options: ["Non-repudiation and sender authentication", "Faster processing speed", "Smaller file size", "Zero chance of packet loss"],
      answer: 0,
      explanation: "Since only the sender holds their private signing key, they cannot deny having authored the message (non-repudiation).",
      difficulty: "Intermediate"
    },
    {
      q: "Which protocol secures web HTTP traffic by layering it on top of TLS/SSL encryption?",
      options: ["SNMP", "HTTPS (Port 443)", "SFTP", "IPsec"],
      answer: 1,
      explanation: "HTTPS encrypts the HTTP communication channel using Transport Layer Security (TLS).",
      difficulty: "Beginner"
    },
    {
      q: "What is a Stateful Packet Inspection (SPI) Firewall?",
      options: ["A firewall that inspects only static IP packet headers in isolation", "A firewall that tracks active TCP connection states and permits incoming packets only if they belong to an established flow", "A software antivirus scanner", "A physical lock on a server room"],
      answer: 1,
      explanation: "Stateful firewalls maintain connection tables, allowing return packets for valid established outbound sessions.",
      difficulty: "Intermediate"
    },
    {
      q: "Which type of DNS record maps a domain name (e.g., example.com) to an IPv4 address?",
      options: ["AAAA record", "A record", "CNAME record", "MX record"],
      answer: 1,
      explanation: "An 'A' record maps a hostname to an IPv4 address; 'AAAA' maps to an IPv6 address.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of an MX record in DNS?",
      options: ["Defines IPv6 addresses", "Specifies the mail exchange servers responsible for accepting email on behalf of a domain", "Aliases one domain to another", "Configures name servers"],
      answer: 1,
      explanation: "MX (Mail Exchanger) records route emails to designated mail destination hosts for the domain.",
      difficulty: "Beginner"
    },
    {
      q: "In a SYN Flood Denial of Service (DoS) attack, what resource on the target server is exhausted?",
      options: ["Disk storage space", "TCP connection backlog queue (half-open connection table)", "DNS cache", "Physical network cable bandwidth"],
      answer: 1,
      explanation: "SYN floods send spoofed SYN packets without completing the 3-way handshake, exhausting the server's half-open backlog.",
      difficulty: "Intermediate"
    },
    {
      q: "What cryptographic defense mitigates SYN Flood attacks without keeping connection state in server memory?",
      options: ["SYN Cookies", "AES encryption", "RSA 4096", "Digital Certificates"],
      answer: 0,
      explanation: "SYN Cookies encode connection parameters into the initial sequence number (ISN), deferring state allocation until ACK.",
      difficulty: "Advanced"
    },
    {
      q: "What is the difference between Symmetric and Asymmetric encryption?",
      options: ["Symmetric uses the same secret key for encryption and decryption; Asymmetric uses public and private key pairs", "Symmetric is slower than asymmetric", "Asymmetric does not require keys", "Symmetric is used only for email"],
      answer: 0,
      explanation: "Symmetric ciphers (AES) use one shared secret; asymmetric ciphers (RSA, ECC) use mathematically linked key pairs.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Certificate Authority (CA) in Public Key Infrastructure (PKI)?",
      options: ["An Internet service provider", "A trusted third-party entity that issues and digitally signs SSL/TLS certificates verifying domain ownership", "A hardware router", "A web hosting platform"],
      answer: 1,
      explanation: "CAs cryptographically sign certificates, allowing browsers to verify that a public key belongs to the real domain.",
      difficulty: "Beginner"
    },
    {
      q: "Which protocol is used by mail clients to retrieve emails from a server while keeping messages synchronized across multiple devices?",
      options: ["POP3", "IMAP (Internet Message Access Protocol)", "SMTP", "SNMP"],
      answer: 1,
      explanation: "IMAP syncs mailboxes across multiple devices on the server; POP3 typically downloads and removes emails from servers.",
      difficulty: "Beginner"
    },
    {
      q: "What role does SMTP (Simple Mail Transfer Protocol) play in email architecture?",
      options: ["Reading email in a web browser", "Transferring email messages from a sender client to a mail server, and between mail servers", "Creating user email passwords", "Filtering spam on routers"],
      answer: 1,
      explanation: "SMTP (Port 25/587) handles outbound email transmission and server-to-server relay.",
      difficulty: "Beginner"
    },
    {
      q: "What is an iterative DNS query?",
      options: ["The DNS client asks a server to resolve the query completely and return the final IP", "The queried DNS server returns the best referral answer it knows (e.g. root or TLD server) for the client to query next", "A query that never finishes", "A query sent via broadcast"],
      answer: 1,
      explanation: "In iterative queries, servers provide referrals pointing the resolver to the next authoritative server in the hierarchy.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Man-in-the-Middle (MitM) attack?",
      options: ["An attacker intercepts and potentially alters communication between two parties who believe they are communicating directly", "An attacker stealing hardware cables", "An attacker guessing passwords", "A virus spreading via USB drives"],
      answer: 0,
      explanation: "MitM attacks intercept unencrypted or improperly authenticated channels to eavesdrop or tamper with packets.",
      difficulty: "Beginner"
    },
    {
      q: "Which hash function family produces a 256-bit fixed-length cryptographic digest and is widely used in TLS and Bitcoin?",
      options: ["MD5", "SHA-1", "SHA-256", "CRC-32"],
      answer: 2,
      explanation: "SHA-256 (part of the SHA-2 family) produces secure 256-bit digests resistant to collision attacks.",
      difficulty: "Beginner"
    },
    {
      q: "What is Perfect Forward Secrecy (PFS) in TLS key exchange?",
      options: ["Storing keys in a vault forever", "Ensuring that compromise of a server's long-term private key does not compromise past session keys (e.g. using Ephemeral Diffie-Hellman)", "Encrypting files twice", "Automatically updating passwords daily"],
      answer: 1,
      explanation: "PFS generates unique session keys for every conversation; past traffic remains unreadable even if server keys leak.",
      difficulty: "Advanced"
    },
    {
      q: "Which HTTP status code indicates that the client must authenticate itself to get the requested response?",
      options: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"],
      answer: 1,
      explanation: "401 Unauthorized indicates missing or invalid authentication credentials.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 403 Forbidden HTTP status code mean?",
      options: ["The server could not find the file", "The server understood the request but refuses to authorize it, even if authenticated", "Server internal error", "Connection timed out"],
      answer: 1,
      explanation: "403 indicates authentication is recognized or irrelevant, but access permissions to the resource are denied.",
      difficulty: "Beginner"
    },
    {
      q: "What is Cross-Site Scripting (XSS)?",
      options: ["A vulnerability where an attacker injects malicious client-side scripts into web pages viewed by other users", "An SQL query flaw", "A denial of service attack", "A hardware fault in graphics cards"],
      answer: 0,
      explanation: "XSS occurs when untrusted input is reflected or rendered into web pages without sanitization, executing malicious JavaScript.",
      difficulty: "Intermediate"
    }
  ],
  "cn-u5-web-fundamentals": [
    {
      q: "Which CSS property ensures that an element's padding and border are included within its total specified width and height?",
      options: ["box-sizing: content-box", "box-sizing: border-box", "display: flex", "overflow: hidden"],
      answer: 1,
      explanation: "box-sizing: border-box causes width and height to include content, padding, and border.",
      difficulty: "Beginner"
    },
    {
      q: "In the HTTP Request-Response cycle, which HTTP method is specified by RFC 7231 to be 'idempotent'?",
      options: ["POST", "PUT", "CONNECT", "PATCH (non-idempotent)"],
      answer: 1,
      explanation: "PUT is idempotent: sending multiple identical PUT requests produces the exact same server resource state.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the key difference between localStorage and sessionStorage in modern web browsers?",
      options: ["localStorage data persists indefinitely until cleared; sessionStorage data is cleared when the browser tab closes", "sessionStorage holds 100MB; localStorage holds 1KB", "localStorage is sent with every HTTP request", "sessionStorage cannot store strings"],
      answer: 0,
      explanation: "localStorage has no expiration; sessionStorage is scoped to the browser session and discarded on tab close.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Document Object Model (DOM)?",
      options: ["A server-side database", "A platform- and language-neutral tree structure representing HTML documents in memory that can be manipulated via JavaScript", "A CSS styling rule", "A network protocol"],
      answer: 1,
      explanation: "The DOM is a tree representation of HTML elements that allows scripts to dynamically inspect and modify page content.",
      difficulty: "Beginner"
    },
    {
      q: "Which HTTP header is set by a web server to store a cookie in the client's browser?",
      options: ["Cookie", "Set-Cookie", "Authorization", "Access-Control-Allow-Origin"],
      answer: 1,
      explanation: "The server includes 'Set-Cookie: name=value; HttpOnly; Secure' in HTTP responses to create cookies in the client.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'HttpOnly' flag on a cookie prevent?",
      options: ["Transmission over HTTPS", "Client-side scripts (e.g. JavaScript document.cookie) from accessing the cookie, mitigating XSS cookie theft", "Cookies from expiring", "Cookies from storing session tokens"],
      answer: 1,
      explanation: "HttpOnly shields sensitive session cookies from being accessed by client scripts during cross-site scripting attacks.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the Same-Origin Policy (SOP) in web browsers enforce?",
      options: ["Websites must run on the same computer", "Scripts on one origin cannot access or manipulate the DOM or fetch data from a different origin (protocol + domain + port)", "All web pages must use the same font", "Images must be in PNG format"],
      answer: 1,
      explanation: "SOP isolates distinct websites: scripts can only interact with resources sharing the identical protocol, domain, and port.",
      difficulty: "Intermediate"
    },
    {
      q: "Which HTTP header is sent by servers to allow cross-origin requests from specific external domains (CORS)?",
      options: ["Access-Control-Allow-Origin", "Allow-Cross-Domain", "Origin-Policy", "X-Frame-Options"],
      answer: 0,
      explanation: "Access-Control-Allow-Origin defines which external web origins are permitted to access resource responses.",
      difficulty: "Beginner"
    },
    {
      q: "In the CSS Box Model, what is the correct order of layers moving outward from the content?",
      options: ["Content -> Border -> Padding -> Margin", "Content -> Padding -> Border -> Margin", "Content -> Margin -> Padding -> Border", "Border -> Padding -> Content -> Margin"],
      answer: 1,
      explanation: "From inside out: Content -> Padding (inner space) -> Border -> Margin (outer spacing).",
      difficulty: "Beginner"
    },
    {
      q: "Which HTML5 semantic element is designed to encapsulate self-contained content that could be distributed independently (e.g. blog post, forum thread)?",
      options: ["<div>", "<section>", "<article>", "<aside>"],
      answer: 2,
      explanation: "<article> specifies independent, reusable content that makes sense on its own outside the page layout.",
      difficulty: "Beginner"
    },
    {
      q: "What is the primary architectural constraint of REST (Representational State Transfer)?",
      options: ["Statelessness: each client request must contain all information required to understand and process the request", "Server must store client session variables", "Must use XML only", "Requires persistent TCP connections"],
      answer: 0,
      explanation: "Statelessness is a fundamental REST constraint; servers do not store client session context between requests.",
      difficulty: "Intermediate"
    },
    {
      q: "Which HTTP status code indicates a permanent redirection where search engines should update their indexed link?",
      options: ["301 Moved Permanently", "302 Found", "304 Not Modified", "307 Temporary Redirect"],
      answer: 0,
      explanation: "301 indicates the target resource has been permanently assigned a new URI.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 304 Not Modified HTTP status code indicate to the browser?",
      options: ["The request failed", "The cached version of the resource is still fresh and valid; no response body is sent over the network", "The user is not logged in", "The page is deleted"],
      answer: 1,
      explanation: "304 informs the browser that headers like ETag or If-Modified-Since match, saving bandwidth by reusing cached assets.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the CSS 'display: flex' property establish on a container element?",
      options: ["A block formatting context with strict tables", "A flexible box layout with main and cross axes for aligning children", "A 3D perspective scene", "A responsive grid with 12 fixed columns"],
      answer: 1,
      explanation: "Flexbox creates a flex container organizing child items dynamically along main and cross axes.",
      difficulty: "Beginner"
    },
    {
      q: "Which CSS Flexbox property aligns flex items along the cross axis (vertical in row direction)?",
      options: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
      answer: 1,
      explanation: "align-items controls cross-axis alignment; justify-content governs main-axis distribution.",
      difficulty: "Beginner"
    },
    {
      q: "What is Event Bubbling in JavaScript?",
      options: ["Creating animated UI bubbles", "An event triggered on a nested element propagates upwards through its ancestor hierarchy in the DOM tree", "Memory leak in event listeners", "Events executing in random order"],
      answer: 1,
      explanation: "Bubbling causes events to fire on the target element first, then bubble up through parent nodes up to window.",
      difficulty: "Intermediate"
    },
    {
      q: "How can event propagation (bubbling) be prevented inside a JavaScript event handler?",
      options: ["e.preventDefault()", "e.stopPropagation()", "return false", "delete event"],
      answer: 1,
      explanation: "stopPropagation() halts the upward traversal of the event through parent DOM nodes.",
      difficulty: "Beginner"
    },
    {
      q: "What does event.preventDefault() do in a JavaScript event listener?",
      options: ["Stops event bubbling", "Suppresses the browser's default action associated with the event (e.g., submitting a form or following a link)", "Removes the element from the DOM", "Clears form fields"],
      answer: 1,
      explanation: "preventDefault() cancels the default browser behavior triggered by the event without stopping propagation.",
      difficulty: "Beginner"
    },
    {
      q: "What is an ETag in HTTP response headers?",
      options: ["An electronic price tag", "An entity tag string representing a specific version of a resource used for web cache validation", "An encryption key", "A tracking cookie"],
      answer: 1,
      explanation: "ETag is an opaque identifier (often a hash) assigned by web servers to check if a cached resource has changed.",
      difficulty: "Intermediate"
    },
    {
      q: "Which HTML5 attribute specifies that a script should execute asynchronously as soon as it is downloaded without blocking HTML parsing?",
      options: ["defer", "async", "preload", "lazy"],
      answer: 1,
      explanation: "async downloads scripts in background and executes them immediately upon receipt without pausing parser.",
      difficulty: "Intermediate"
    }
  ],
  "cn-u6-frontend-frameworks": [
    {
      q: "What is the total number of grid columns in a standard Bootstrap responsive layout row?",
      options: ["8", "10", "12", "16"],
      answer: 2,
      explanation: "Bootstrap's flexible grid system is divided into 12 proportional columns.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Single Page Application (SPA)?",
      options: ["A website that has only one paragraph of text", "A web application that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from the server", "A website without JavaScript", "A static HTML flyer"],
      answer: 1,
      explanation: "SPAs load an initial HTML shell and update views dynamically via client-side routing and API calls.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Virtual DOM used by modern frontend libraries like React?",
      options: ["A browser extension", "An in-memory lightweight JavaScript object tree mirroring the real DOM to compute optimal diffs before updating the real DOM", "A headless browser", "A 3D VR interface"],
      answer: 1,
      explanation: "The Virtual DOM calculates changes (reconciliation) in memory and applies batch updates to minimize expensive real DOM operations.",
      difficulty: "Beginner"
    },
    {
      q: "In Bootstrap, which class creates a full-width responsive container that stretches across the entire viewport width?",
      options: [".container", ".container-fluid", ".row", ".col-full"],
      answer: 1,
      explanation: ".container-fluid spans 100% of the viewport width across all breakpoint sizes.",
      difficulty: "Beginner"
    },
    {
      q: "What is Component-Based Architecture in frontend frameworks?",
      options: ["Writing all code in one 10,000-line file", "Structuring UIs into reusable, self-contained, modular pieces that manage their own state and rendering", "Using only CSS components", "Running code on backend components"],
      answer: 1,
      explanation: "Components encapsulate HTML markup, CSS styling, and JavaScript logic into independent building blocks.",
      difficulty: "Beginner"
    },
    {
      q: "What is the difference between One-Way and Two-Way Data Binding?",
      options: ["One-way flows from model to UI; two-way synchronizes changes automatically between model and UI in both directions", "Two-way binding uses two database tables", "One-way is deprecated", "Two-way binding requires WebSockets"],
      answer: 0,
      explanation: "One-way data flow (React) ensures predictable state; two-way binding (Angular/Vue v-model) synchronizes UI input and model.",
      difficulty: "Intermediate"
    },
    {
      q: "In CSS Grid, which property defines the columns of a grid layout with explicit widths or fractional (fr) units?",
      options: ["grid-template-columns", "grid-column-gap", "display: grid-columns", "grid-auto-flow"],
      answer: 0,
      explanation: "grid-template-columns defines the track sizing functions and column lines of the grid container.",
      difficulty: "Beginner"
    },
    {
      q: "What is the 'Diffing' algorithm in React reconciliation?",
      options: ["Comparing two database tables", "An O(n) heuristic algorithm that compares two Virtual DOM trees to identify modified subtrees", "Subtracting numbers in JavaScript", "Compressing files"],
      answer: 1,
      explanation: "React's diffing algorithm compares Virtual DOM nodes by element type and unique 'key' props to update only what changed.",
      difficulty: "Intermediate"
    },
    {
      q: "Why are unique 'key' props essential when rendering dynamic lists in component frameworks?",
      options: ["To style list items with CSS", "To help the framework identify which items have changed, been added, or removed, enabling efficient DOM re-use", "To count list items", "To encrypt list data"],
      answer: 1,
      explanation: "Stable keys allow reconciliation to match list items across renders without destroying and recreating DOM nodes.",
      difficulty: "Intermediate"
    },
    {
      q: "What is State in a frontend web component?",
      options: ["The physical location of the server", "An internal data object that determines how the component renders and behaves, triggering re-renders when updated", "A CSS class name", "The HTTP status code"],
      answer: 1,
      explanation: "Component state holds dynamic data; changing state causes the component to automatically re-render its view.",
      difficulty: "Beginner"
    },
    {
      q: "What are Props in component-based UI libraries?",
      options: ["Theater decorations", "Read-only input parameters passed from a parent component down to a child component", "Database primary keys", "Global variables"],
      answer: 1,
      explanation: "Props (properties) pass data and callbacks downwards through the component hierarchy in a unidirectional flow.",
      difficulty: "Beginner"
    },
    {
      q: "What is Client-Side Routing in Single Page Applications?",
      options: ["Hardware routing on the user's Wi-Fi router", "Intercepting URL changes in JavaScript (using the History API) to render different views without contacting the server for new HTML pages", "DNS lookups in the browser", "Redirecting 404 pages"],
      answer: 1,
      explanation: "Client-side routers use history.pushState() to switch views instantly without triggering full browser page refreshes.",
      difficulty: "Intermediate"
    },
    {
      q: "Which Bootstrap class makes an image automatically scale responsively with its parent element (max-width: 100%; height: auto)?",
      options: [".img-scale", ".img-fluid", ".responsive-img", ".img-fit"],
      answer: 1,
      explanation: "The .img-fluid class applies max-width: 100% and height: auto to ensure images scale smoothly across devices.",
      difficulty: "Beginner"
    },
    {
      q: "What is Lazy Loading in modern frontend performance optimization?",
      options: ["Delaying program execution until the user clicks a button", "Deferring initialization or loading of non-critical assets/components until they are needed (e.g. entering viewport)", "Writing minimal code", "Running slow database queries"],
      answer: 1,
      explanation: "Lazy loading reduces initial bundle size by fetching code chunks or images on-demand as users navigate.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Tree Shaking in modern JavaScript bundlers (like Webpack, Vite, Rollup)?",
      options: ["Cleaning files from hard drives", "Dead-code elimination that removes unused ES module exports from the final production bundle", "Animating visual trees", "Restarting the development server"],
      answer: 1,
      explanation: "Tree shaking analyzes static import/export statements and discards unreferenced code to minimize download size.",
      difficulty: "Intermediate"
    },
    {
      q: "In responsive web design, what is a CSS Media Query?",
      options: ["A search query for video files", "A CSS rule (e.g. @media (max-width: 768px)) that applies styles conditionally based on device characteristics like viewport width", "A database query for media", "A JavaScript alert"],
      answer: 1,
      explanation: "Media queries tailor CSS layouts dynamically to mobile screens, tablets, or desktop viewports.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of CSS Reset / Normalize.css stylesheets?",
      options: ["To delete all styles", "To eliminate cross-browser inconsistencies in default element margins, paddings, and font sizes", "To enforce dark mode", "To speed up JavaScript"],
      answer: 1,
      explanation: "Normalize.css standardizes default HTML element styles across all web browsers (Chrome, Safari, Firefox).",
      difficulty: "Beginner"
    },
    {
      q: "What is the Jamstack architecture in modern web engineering?",
      options: ["Java, Apache, MySQL", "JavaScript, APIs, and pre-rendered Markup delivered via CDN", "JSON and Multimedia stack", "Just A Monolith"],
      answer: 1,
      explanation: "Jamstack decouples the frontend static markup from backend dynamic APIs, delivering ultra-fast pages via CDNs.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Server-Side Rendering (SSR) compared to Client-Side Rendering (CSR)?",
      options: ["Rendering graphics on the GPU", "Generating complete HTML on the server for each request, delivering faster initial paint and superior SEO compared to CSR", "Hosting websites on shared servers", "Using server databases"],
      answer: 1,
      explanation: "SSR builds full HTML on the server before transmitting it to the browser, optimizing SEO and First Contentful Paint.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Hydration in modern SSR frameworks (like Next.js or Nuxt)?",
      options: ["Drinking water while coding", "The process of attaching client-side JavaScript event listeners and state to server-rendered static HTML", "Caching images in service workers", "Compiling TypeScript to JavaScript"],
      answer: 1,
      explanation: "Hydration brings server-rendered HTML to life by initializing client-side reactive components and event handlers.",
      difficulty: "Advanced"
    }
  ]
};
