FROM php:apache

ENV TZ=Europe/Prague
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./source/ /var/www/html/

COPY ./apache.conf /etc/apache2/sites-available/000-default.conf
RUN echo "ServerName hackdays.eu" >> /etc/apache2/apache2.conf

RUN apt-get update && apt-get install brotli gzip -y

RUN chown -R www-data:www-data /var/www/html/ \
    && a2enmod rewrite && a2enmod ssl && a2enmod brotli && a2enmod headers
    
RUN apachectl restart

EXPOSE 80 443
