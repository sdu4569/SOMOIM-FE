set -e
npm run build
cd dist
echo > .nojekyll
git init