import React from 'react';

function MainPage() {
  return (
    <div className="main-content">
      <img className="title" src="/images/title.png" alt="О журнале" />
      <p className="caption">
        Слово главного редактора
      </p>
      <div className="main-description">
        <p>
          В журнале публикуются результаты исследований в области теоретической и прикладной математики, механики и информатики, отражающие спектр научной тематики математического факультета СыктГУ и других организаций, статьи чьих сотрудников помещаются в «Вестнике».
        </p>
        <p>
          В разделе «Математика» публикуются работы по функциональному анализу, топологии, теории вероятностей, математической физике.
        </p>
        <p>
          Раздел «Прикладная математика и механика» формируется работами в области методов решения краевых задач, теории управления и методов оптимизации, исследования операций, теории графов, теории сплайнов и вейвлетов, конечномерных фреймов (прикладная математика) и в области механики деформируемого твердого тела и вязкоупругих полимерных систем (механика).
        </p>
        <p>
          В разделе «Информатика» публикуются статьи по компьютерной графике, а также по обработке, хранению, передаче и защите информации.
        </p>
        <p>
          Важной составляющей «Вестника» является раздел «Наставник – ученик», предназначенный для публикации работ начинающих исследователей (студентов, магистрантов, аспирантов).
        </p>
        <p>
          Имеются также рубрики «Краткие научные сообщения», «Легкое чтение для профессионала», «Методические материалы», «Хроника университетской жизни», «Юбилейные даты».
        </p>
        <p>
          Журнал зарегистрирован как СМИ, ПИ №ФС77-37565 от 17 сентября 2009 года.
        </p>
        <img className="certificate" src="/images/certificate.png" alt="Свидетельство" />
        <p>
          Размещаемые на данном сайте материалы - это копии печатного сборника.
        </p>
      </div>
    </div>
  );
}

export default MainPage;