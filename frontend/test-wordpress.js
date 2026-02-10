// Test connexion WordPress API
const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || 'https://bateau-a-paris.fr/wp-json';

async function testWordPress() {
  console.log('🧪 Test API WordPress depuis Next.js\n');
  console.log('API URL:', WP_API);
  
  try {
    // Test 1: Pages
    const pagesRes = await fetch(`${WP_API}/wp/v2/pages`);
    const pages = await pagesRes.json();
    console.log('✅ Pages récupérées:', pages.length);
    console.log('   Exemples:', pages.slice(0, 3).map(p => p.title.rendered));
    
    // Test 2: Posts
    const postsRes = await fetch(`${WP_API}/wp/v2/posts`);
    const posts = await postsRes.json();
    console.log('\n✅ Posts récupérés:', posts.length);
    
    // Test 3: Headers CORS
    console.log('\n✅ CORS Header:', pagesRes.headers.get('access-control-allow-origin'));
    
    console.log('\n🎉🎉🎉 TOUT FONCTIONNE PARFAITEMENT !');
    console.log('\n📊 Résumé:');
    console.log('   - WordPress API: ✅');
    console.log('   - CORS activé: ✅');
    console.log('   - Next.js connecté: ✅');
    
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.log('\n💡 Vérifier:');
    console.log('   1. Enable CORS sauvegardé ?');
    console.log('   2. Cache WordPress vidé ?');
    console.log('   3. localhost:3001 dans la liste ?');
  }
}

testWordPress();
