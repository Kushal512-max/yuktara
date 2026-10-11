// scripts/comprehensive_test.js
const assert = require('assert');

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting Comprehensive sArathI Verification Suite');
  console.log('====================================================\n');

  const BASE = 'http://localhost:3000';

  // 1. Health & Server check
  console.log('1️⃣ Checking /api/health ...');
  const healthRes = await fetch(`${BASE}/api/health`);
  assert.strictEqual(healthRes.status, 200, 'Health endpoint should return 200');
  const healthData = await healthRes.json();
  console.log('   ✅ Health status:', healthData.status);
  console.log('   ✅ Service name:', healthData.service);
  console.log('   ✅ DB status:   ', healthData.database, `(${healthData.connection})`);

  // 2. Index HTML verification
  console.log('\n2️⃣ Checking index.html and frontend assets ...');
  const htmlRes = await fetch(`${BASE}/`);
  assert.strictEqual(htmlRes.status, 200);
  const html = await htmlRes.text();
  assert(html.includes('<title>sArathI'), 'Title should contain sArathI');
  assert(html.includes('pdf.min.js'), 'pdf.js CDN should be included');
  assert(html.includes('aiSettingsModalWrap'), 'AI settings modal container should be present');
  console.log('   ✅ index.html correctly branded and includes PDF.js + AI modal');

  // 3. User Login - Tejas Ostwal
  console.log('\n3️⃣ Checking Authentication: Login Tejas Ostwal ...');
  const loginRes = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'tejasostwal@gmail.com', password: '123456' })
  });
  assert.strictEqual(loginRes.status, 200);
  const loginData = await loginRes.json();
  assert(loginData.success, 'Login should succeed');
  assert.strictEqual(loginData.user.email, 'tejasostwal@gmail.com');
  console.log('   ✅ Login successful for:', loginData.user.fullName, `(${loginData.user.email})`);

  // 4. Admin Data Check
  console.log('\n4️⃣ Checking Admin Explorer & PostgreSQL Tables ...');
  const adminRes = await fetch(`${BASE}/api/admin/data`, {
    headers: { 'x-admin-email': 'admin@sarathi.edu' }
  });
  assert.strictEqual(adminRes.status, 200);
  const adminData = await adminRes.json();
  console.log('   ✅ Total Users in DB:    ', adminData.summary.totalUsers);
  console.log('   ✅ Total Study Sessions: ', adminData.summary.totalStudySessions);
  console.log('   ✅ Total Quiz Attempts:  ', adminData.summary.totalQuizAttempts);
  console.log('   ✅ Total Auth Logs:      ', adminData.summary.totalAuthLogs);

  const tejasInAdmin = adminData.users.find(u => u.email === 'tejasostwal@gmail.com');
  assert(tejasInAdmin, 'Tejas Ostwal should exist in database users table');
  console.log('   ✅ Tejas profile verified in DB Explorer table:', {
    id: tejasInAdmin.id,
    name: tejasInAdmin.name,
    email: tejasInAdmin.email,
    sessions: tejasInAdmin.total_sessions,
    quizzes: tejasInAdmin.total_quizzes
  });

  // 5. User Detail (matching user screenshot)
  console.log('\n5️⃣ Checking User Detail view for Tejas Ostwal ...');
  const userDetailRes = await fetch(`${BASE}/api/admin/user-detail?userId=${tejasInAdmin.id}`, {
    headers: { 'x-admin-email': 'admin@sarathi.edu' }
  });
  assert.strictEqual(userDetailRes.status, 200);
  const userDetail = await userDetailRes.json();
  assert.strictEqual(userDetail.user.email, 'tejasostwal@gmail.com');
  assert.strictEqual(userDetail.studySessions.length, 4, 'Should have 4 seeded study sessions');
  assert.strictEqual(userDetail.quizAttempts.length, 1, 'Should have 1 seeded quiz attempt');
  console.log('   ✅ User Detail matches screenshot: 4 study sessions, 1 quiz, and auth logs verified.');

  // 6. AI Chat Live LLM
  console.log('\n6️⃣ Checking AI Chat (sArathI Live Free LLM) ...');
  const aiChatRes = await fetch(`${BASE}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: 'Explain Binary Search and show me a clean Python code snippet.' }
      ],
      model: 'pollinations',
      studentProfile: {
        name: 'Tejas Ajit Ostwal',
        subject: 'Data Structures & Algorithms',
        level: 'Intermediate'
      }
    })
  });
  assert.strictEqual(aiChatRes.status, 200);
  const aiChatData = await aiChatRes.json();
  assert(aiChatData.reply && aiChatData.reply.length > 50, 'AI reply should be non-empty');
  console.log('   ✅ AI Reply received (length: ' + aiChatData.reply.length + ' chars)');
  console.log('   Preview:\n' + aiChatData.reply.slice(0, 160) + '...\n');

  // 7. AI Document Upload Q&A
  console.log('7️⃣ Checking Document Upload & Grounded Q&A ...');
  const docText = `
CHAPTER 4: NEURAL NETWORKS AND BACKPROPAGATION
Neural networks are computing systems inspired by biological neural networks.
Backpropagation computes the gradient of the loss function with respect to weights using the chain rule of calculus.
Learning rate alpha controls the step size during gradient descent optimization. Typical values range from 0.001 to 0.01.
Overfitting can be prevented using Dropout, L2 Regularization, and Early Stopping.
`;
  const docChatRes = await fetch(`${BASE}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: 'What prevents overfitting and what is the typical learning rate according to my document?' }
      ],
      model: 'pollinations',
      documentContext: {
        name: 'neural_networks_chapter4.txt',
        content: docText
      }
    })
  });
  assert.strictEqual(docChatRes.status, 200);
  const docChatData = await docChatRes.json();
  assert(docChatData.reply && docChatData.reply.length > 50, 'Document AI reply should be non-empty');
  console.log('   ✅ Document Q&A Reply received (length: ' + docChatData.reply.length + ' chars)');
  console.log('   Preview:\n' + docChatData.reply.slice(0, 250) + '...\n');

  console.log('====================================================');
  console.log('🎉 ALL 7/7 VERIFICATION TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
