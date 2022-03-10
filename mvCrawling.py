from bs4 import BeautifulSoup as bs
from selenium import webdriver
import json 

# 애니3063, 판타지9744, 코미디6548, 로맨스8883,액션1365, 스릴러8933
ids = ['3063', '9744', '6548', '8883', '1365', '8933'];
genre = ['애니메이션', '판타지', '코미디', '로맨스', '액션', '스릴러'];
driver = webdriver.Chrome('/Users/jke/dev/chromedriver')

MV_DATA = './server/mv.json'

def makeJSON():
    DETAIL_URL = []

    mv_datas = {}
    for idx, id in enumerate(ids):
        URL = 'https://www.netflix.com/browse/genre/'+id;
        
        driver.get(URL)
        html = driver.page_source
        soup = bs(html, 'html.parser')
        mvUl = soup.select_one('.nm-content-horizontal-row-item-container')
        genre_datas = {}
        for idx2, data in enumerate(mvUl):
            if data.find("img")['src'].find('https') != -1:
                mv_detail = {}
                # genre_data['title'] =  data.select_one( '.nm-collections-title-name').text
                mv_detail['main_img'] = data.find('img')['src']
                # mv_detail.append(data.find('a')['href'])
                
                DETAIL_URL = []
                DETAIL_URL.append(data.find('a')['href'])

                for url in DETAIL_URL:
                    driver.get(url)
                    html = driver.page_source
                    soup = bs(html, 'html.parser')
                    
                    bgImgs = soup.select('.hero-image')
                    mv_detail['desktopBgImg'] = str(bgImgs[0]['style']).split(';')[1].split('"')[1]
                    mv_detail['mobileBgImg'] = str(bgImgs[1]['style']).split(';')[1].split('"')[1]
                    mv_detail['logoImg'] = soup.select_one('.logo-container > img')['src']
                    mv_detail['title'] = soup.select_one('.title-title').text
                    mv_detail['year'] = soup.select_one('.item-year').text
                    mv_detail['age'] = soup.select_one('.maturity-number').text
                    mv_detail['duration'] = soup.select_one('.duration').text
                    mv_detail['info'] = soup.select_one('.title-info-synopsis').text
                    mv_detail['role'] = soup.select_one('.title-data-info-item-list').text
                    # mv_detail['genre'] = idx2;
                    genre_datas[str(idx)+str(idx2)] = mv_detail
            
        mv_datas[idx] = genre_datas
    driver.close()
    return mv_datas;
    
def saveData(fileName, json_datas):
    with open(fileName, 'w') as f:
        f.write(json.dumps(json_datas, indent=2, ensure_ascii=False))   #  json -> str

if __name__ == '__main__':
    saveData(MV_DATA, makeJSON())