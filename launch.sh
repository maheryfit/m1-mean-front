ng build --configuration production
rm -R /var/www/html/*
mv dist/m1-mean-front/browser/* /var/www/html/
